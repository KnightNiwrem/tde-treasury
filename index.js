const { isEmpty, isNil } = require('lodash');
const DatabaseService = require('./services/database');
const TelegramService = require('./services/telegram');
const Item = require('./models/item');

const databaseService = new DatabaseService();
const telegramService = new TelegramService();
const telegramMessageSubject = telegramService.getMessageSubject();

telegramMessageSubject.subscribe((request) => {
  const update = request.body;
  const { message } = update;
  const { forward_date, forward_from, from, chat, text } = message;

  // This bot only responds to text messages
  if (isEmpty(text)) {
    return;
  }
  
  // Handle guild warehouse updates
  if (!isNil(forward_from) && text.startsWith("Guild Warehouse:")) {
    const { is_bot, username } = forward_from;
    if (!is_bot || isNil(username) || username !== 'chtwrsbot') {
      return;
    }
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
  const quantity = parseInt(quantityText);
  return updateItemQuantity(chat.id, itemCode, multiplier * quantity, from.id);
});

const commonPoolId = 0;
const updateItemQuantity = async (chatId, itemCode, quantity, telegramId) => {
  let personalItemEntry = await Item.query()
  .where('itemCode', itemCode)
  .andWhere('telegramId', telegramId)
  .first();

  let commonItemEntry = await Item.query()
  .where('itemCode', itemCode)
  .andWhere('telegramId', commonPoolId)
  .first();

  if (isNil(personalItemEntry)) {
    personalItemEntry = await Item.query().insert({ itemCode, quantity: 0, telegramId });
  }
  if (isNil(commonItemEntry)) {
    commonItemEntry = await Item.query().insert({ itemCode, quantity: 0, telegramId: commonPoolId });
  }

  const availableQuantity = personalItemEntry.quantity + commonItemEntry.quantity;
  const finalQuantity = availableQuantity + quantity;
  if (finalQuantity < 0) {
    const message = {
      chat_id: chatId,
      text: `Could not withdraw ${Math.abs(quantity)} ${itemCode}. Estimate to be able to withdraw up to ${availableQuantity} ${itemCode}.

Personal: ${personalItemEntry.quantity}
Common: ${commonItemEntry.quantity}`
    };
    return telegramService.sendMessage({ message });
  }

  const newPersonalQuantity = Math.max(personalItemEntry.quantity + quantity, 0);
  const newPersonalItemEntry = await Item.query()
  .patch({ quantity: newPersonalQuantity })
  .where('telegramId', telegramId)
  .returning('*');

  // This suggests a withdraw - check if common pool needs
  // to be updated too
  const isWithdrawal = quantity < 0;
  const candidateCommonQuantity = commonItemEntry.quantity + (personalItemEntry.quantity - newPersonalQuantity) + quantity;
  const newCommonQuantity = isWithdrawal ? candidateCommonQuantity : commonItemEntry.quantity;
  const newCommonItemEntry = await Item.query()
  .patch({ quantity: newCommonQuantity })
  .where('telegramId', commonPoolId)
  .returning('*');

  const message = {
    chat_id: chatId,
    text: `Processed ${isWithdrawal ? 'withdrawal' : 'deposit'} for ${Math.abs(quantity)} ${itemCode}.

Personal: ${newPersonalItemEntry.quantity} (${newPersonalItemEntry.quantity >= personalItemEntry.quantity ? '+' : '-'}${Math.abs(newPersonalItemEntry.quantity - personalItemEntry.quantity)})
Common: ${commonItemEntry.quantity} (${newCommonItemEntry.quantity >= commonItemEntry.quantity ? '+' : '-'}${Math.abs(newCommonItemEntry.quantity - commonItemEntry.quantity)})`
  };
  return telegramService.sendMessage({ message });
};


