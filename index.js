const { isEmpty, isNil } = require('lodash');
const { map, filter } = require('rxjs/operators');
const DatabaseService = require('./services/database');
const TelegramService = require('./services/telegram');
const Item = require('./models/item');

const commonPoolId = 0;
const itemCodeToNameMap = new Map(require('./constants/items'));

const databaseService = new DatabaseService();
const telegramService = new TelegramService();

const updateItemQuantity = async (itemCode, itemName, quantity, telegramId) => {
  const personalItemEntry = await Item.fetchOrCreate(itemCode, telegramId);
  const commonItemEntry = await Item.fetchOrCreate(itemCode, commonPoolId);

  const availableQuantity = personalItemEntry.quantity + commonItemEntry.quantity;
  const finalQuantity = availableQuantity + quantity;
  if (finalQuantity < 0) {
    const text = `Can only withdraw up to ${availableQuantity} ${itemName}:
Personal: ${personalItemEntry.quantity} ${itemName}
Common: ${commonItemEntry.quantity} ${itemName}`;
    return text;
  }

  const newPersonalQuantity = Math.max(personalItemEntry.quantity + quantity, 0);
  const newCommonQuantity = commonItemEntry.quantity + Math.min(personalItemEntry.quantity + quantity, 0);
  const newPersonalItemEntry = await personalItemEntry.patch({ quantity: newPersonalQuantity });
  const newCommonItemEntry = await commonItemEntry.patch({ quantity: newCommonQuantity });

  const text = `Processed ${quantity > 0 ? 'deposit' : 'withdrawal'} for ${Math.abs(quantity)} ${itemName}.
Personal: ${newPersonalItemEntry.quantity} (${newPersonalItemEntry.quantity < personalItemEntry.quantity ? '-' : '+'}${Math.abs(newPersonalItemEntry.quantity - personalItemEntry.quantity)})
Common: ${newCommonItemEntry.quantity} (${newCommonItemEntry.quantity < commonItemEntry.quantity ? '-' : '+'}${Math.abs(newCommonItemEntry.quantity - commonItemEntry.quantity)})`;
  return text;
};

const sendTelegramMessage = async (chatId, text) => {
  const message = { chat_id: chatId, text };
  return telegramService.sendMessage({ message });
};

const telegramMessageSubject = telegramService.getMessageSubject();
telegramMessageSubject
.pipe(
  map((request) => {
    const update = request.body;
    const { message } = update;
    return message;
  }),
  filter((message) => {
    const { forward_date, forward_from, from, chat, text } = message;
    return !isEmpty(text);
  })
)
.subscribe(async (message) => {
  const { forward_date, forward_from, from, chat, text } = message;

  // Handle guild warehouse updates
  if (!isNil(forward_from) && text.startsWith("Guild Warehouse:\n")) {
    const { is_bot, username } = forward_from;
    if (!is_bot || isNil(username) || username !== 'chtwrsbot') {
      return;
    }

    const stockRegex = /(.+?) (.+?) x (\d+)/;
    const stockStatuses = text.split("\n").slice(1);
    stockStatuses
    .map((stockStatus) => stockStatus.match(stockRegex))
    .filter((stockMatches) => !isNil(stockMatches))
    .forEach(async (stockMatches) => {
      const [stockStatus, itemCode, itemName, quantity, ...rest] = stockMatches;
      const ownedQuantity = await Item.countQuantity((builder) => {
        return builder.where('itemCode', itemCode).andWhere('telegramId', '!=', commonPoolId);
      });

      const commonQuantity = quantity - ownedQuantity;
      const commonItemEntry = await Item.fetchOrCreate(itemCode, commonPoolId);
      await commonItemEntry.patch({ quantity: commonQuantity });
    });
    sendTelegramMessage(chat.id, 'Updated guild warehouse state!');
    return;
  }

  // At this point, we care if the message has a sender
  if (isNil(from)) {
    return;
  }

  // We are only interested in 2 commands
  let commandRegex;
  let multiplier = 1;
  if (text.startsWith('/g_deposit')) {
    commandRegex = /\/g_deposit (.+?) (\d+)/;
  } else if (text.startsWith('/g_withdraw')) {
    commandRegex = /\/g_withdraw (.+?) (\d+)/;
    multiplier = -1;
  }

  if (isNil(commandRegex)) {
    return;
  }

  const matches = text.match(commandRegex);
  const [originalCommand, itemCode, quantityText, ...rest] = matches;
  const itemName = itemCodeToNameMap.has(itemCode) ? itemCodeToNameMap.get(itemCode) : `Mystery Item ${itemCode}`;
  const quantity = parseInt(quantityText);
  sendTelegramMessage(chat.id, await updateItemQuantity(itemCode, itemName, multiplier * quantity, from.id));
});


