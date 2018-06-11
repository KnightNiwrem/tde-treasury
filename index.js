const fetch = require('node-fetch');
const { chunk, isEmpty, isNil } = require('lodash');
const { map, filter } = require('rxjs/operators');
const DatabaseService = require('./services/database');
const TelegramService = require('./services/telegram');
const Item = require('./models/item');

const commonPoolId = 0;
const itemCodeToNameMap = new Map(require('./constants/items'));

const databaseService = new DatabaseService();
const telegramService = new TelegramService();

const sendTelegramMessage = async (chatId, text) => {
  const message = { chat_id: chatId, text };
  return telegramService.sendMessage({ message });
};

const telegramMessageSubject = telegramService.getMessageSubject();
const relevantMessages = telegramMessageSubject.pipe(
  map((request) => {
    const update = request.body;
    const { message } = update;
    return message;
  }),
  filter((message) => {
    const { forward_date, forward_from, from, chat, text } = message;
    const isValidGroup = chat.id === -1001159059268 || chat.id === 41284431;
    return !isEmpty(text) && isValidGroup;
  })
);

const warehouseUpdates = relevantMessages.pipe(
  filter((message) => {
    const { forward_date, forward_from, from, chat, text } = message;
    return !isNil(forward_from) && text.startsWith("Guild Warehouse:\n");
  }),
  filter((message) => {
    const { forward_date, forward_from, from, chat, text } = message;
    const { is_bot, username } = forward_from;
    return is_bot && !isNil(username) && username === 'chtwrsbot';
  })
);

const helpRequests = relevantMessages.pipe(
  filter((message) => {
    const { forward_date, forward_from, from, chat, text } = message;
    return text.startsWith('/help');
  })
);

const personalSummaryRequests = relevantMessages.pipe(
  filter((message) => {
    const { forward_date, forward_from, from, chat, text } = message;
    return text.startsWith('/personal_summary') && !isNil(from);
  })
);

const fullSummaryRequests = relevantMessages.pipe(
  filter((message) => {
    const { forward_date, forward_from, from, chat, text } = message;
    return text.startsWith('/full_summary') && !isNil(from);
  })
);

const findRequests = relevantMessages.pipe(
  filter((message) => {
    const { forward_date, forward_from, from, chat, text } = message;
    return text.startsWith('/find ') && !isNil(from);
  })
);

const updateRequests = relevantMessages.pipe(
  filter((message) => {
    const { forward_date, forward_from, from, chat, text } = message;
    const isValidCommand = text.startsWith('/g_deposit ') || text.startsWith('/g_withdraw ')
    return !isNil(from) && isValidCommand;
  })
);

warehouseUpdates.subscribe(async (message) => {
  const { forward_date, forward_from, from, chat, text } = message;
  const stockStatuses = text.split("\n").slice(1);

  const stockRegex = /(.+?) (.+?) x (\d+)/;
  const matches = stockStatuses
  .map((stockStatus) => stockStatus.match(stockRegex))
  .filter((stockMatches) => !isNil(stockMatches));

  matches.forEach(async (match) => {
    const [stockStatus, itemCode, itemName, quantity, ...rest] = match;
    const ownedQuantity = await Item.countQuantity((builder) => {
      return builder.where('itemCode', itemCode).andWhere('telegramId', '!=', commonPoolId);
    });

    const commonQuantity = quantity - ownedQuantity;
    const commonItemEntry = await Item.fetchOrCreate(itemCode, commonPoolId);
    await commonItemEntry.patch({ quantity: commonQuantity });
  });
  sendTelegramMessage(chat.id, 'Updated guild warehouse state!');
});

helpRequests.subscribe(async (message) => {
  const { forward_date, forward_from, from, chat, text } = message;
  const helpText = `/g_deposit {item code} {quantity} - Claim items under personal balance
/g_withdraw {item code} {quantity} - Releases items from personal balance (and common balance, if necessary)
/personal_summary {item code OR partial/full item name} - Presents personal summary from guild warehouse
/full_summary {item code OR partial/full item name} - Presents full summary of guild warehouse
/find {exact item code OR exact item name} - Presents a view of all balances for this item

Forward guild warehouse message to update the common pool!`;
  sendTelegramMessage(chat.id, helpText);
});

personalSummaryRequests.subscribe(async (message) => {
  const { forward_date, forward_from, from, chat, text } = message;
  const { first_name } = from;

  const summaryRegex = /^\/personal_summary(?: )?(.*)$/;
  const [request, searchTerm, ...rest] = text.match(summaryRegex);

  const isExact = itemCodeToNameMap.has(searchTerm);
  const itemCodes = isExact ? [searchTerm] : [...itemCodeToNameMap.entries()].filter(([itemCode, itemName]) => itemName.toLowerCase().includes(searchTerm.toLowerCase())).map(([itemCode, itemName]) => itemCode);
  if (isEmpty(itemCodes)) {
    const summaryText = `Replying to ${first_name}:
Found no item that matches the term: ${searchTerm}!`;
    sendTelegramMessage(chat.id, summaryText);
    return;
  }

  const summaryLines = await Promise.all(itemCodes.map(async (itemCode) => {
    const personalCount = await Item.countQuantity((builder) => {
      return builder.where('itemCode', itemCode).andWhere('telegramId', from.id);
    });
    const commonCount = await Item.countQuantity((builder) => {
      return builder.where('itemCode', itemCode).andWhere('telegramId', commonPoolId);
    });
    return personalCount === 0 ? '' : `${itemCodeToNameMap.get(itemCode)}: ${personalCount} personal, ${commonCount} common`;
  }));
  const summaryLineGroups = chunk(summaryLines.filter((summaryLine) => !isEmpty(summaryLine)), 20);
  const summaryTextGroups = summaryLineGroups.map((summaryLines) => summaryLines.join('\n'));

  if (isEmpty(summaryTextGroups)) {
    sendTelegramMessage(chat.id, `Replying to ${first_name}:
You have got nothing to your name!`);
    return;
  }
  summaryTextGroups.forEach((summaryText) => sendTelegramMessage(chat.id, `Replying to ${first_name}:
${summaryText}`));
});

fullSummaryRequests.subscribe(async (message) => {
  const { forward_date, forward_from, from, chat, text } = message;

  const summaryRegex = /^\/full_summary(?: )?(.*)$/;
  const [request, searchTerm, ...rest] = text.match(summaryRegex);

  const isExact = itemCodeToNameMap.has(searchTerm);
  const itemCodes = isExact ? [searchTerm] : [...itemCodeToNameMap.entries()].filter(([itemCode, itemName]) => itemName.toLowerCase().includes(searchTerm.toLowerCase())).map(([itemCode, itemName]) => itemCode);
  if (isEmpty(itemCodes)) {
    const summaryText = `Found no item that matches the term: ${searchTerm}!`;
    sendTelegramMessage(chat.id, summaryText);
    return;
  }

  const summaryLines = await Promise.all(itemCodes.map(async (itemCode) => {
    const personalCount = await Item.countQuantity((builder) => {
      return builder.where('itemCode', itemCode).andWhere('telegramId', from.id);
    });
    const commonCount = await Item.countQuantity((builder) => {
      return builder.where('itemCode', itemCode).andWhere('telegramId', commonPoolId);
    });
    return personalCount + commonCount === 0 ? '' : `${itemCodeToNameMap.get(itemCode)}: ${personalCount} personal, ${commonCount} common`;
  }));
  const summaryLineGroups = chunk(summaryLines.filter((summaryLine) => !isEmpty(summaryLine)), 20);
  const summaryTextGroups = summaryLineGroups.map((summaryLines) => summaryLines.join('\n'));

  if (isEmpty(summaryTextGroups)) {
    sendTelegramMessage(chat.id, 'The guild has got nothing to its name!');
    return;
  }
  summaryTextGroups.forEach((summaryText) => sendTelegramMessage(chat.id, summaryText));
});

findRequests.subscribe(async (message) => {
  const { forward_date, forward_from, from, chat, text } = message;

  const findRegex = /^\/find (.+)$/;
  const [request, searchTerm, ...rest] = text.match(findRegex);

  const exactCodes = new Set([...itemCodeToNameMap.keys()]);
  const exactNames = new Set([...itemCodeToNameMap.values()]);
  const isExact = exactCodes.has(searchTerm) || exactCodes.has(searchTerm);

  let itemCodes = [];
  if (exactCodes.has(searchTerm)) {
    itemCodes.push(searchTerm);
  } else if (exactNames.has(searchTerm)) {
    const exactItemCode = [...itemCodeToNameMap.entries()].filter(([itemCode, itemName]) => itemName.toLowerCase() === searchTerm.toLowerCase()).map(([itemCode, itemName]) => itemCode);
    itemCodes.push(...exactItemCode);
  } else {
    const candidateItemCodes = [...itemCodeToNameMap.entries()].filter(([itemCode, itemName]) => itemName.toLowerCase().includes(searchTerm.toLowerCase())).map(([itemCode, itemName]) => itemCode);
    itemCodes.push(...candidateItemCodes);
  }

  if (isEmpty(itemCodes)) {
    const findText = `Found no item that matches the term: ${searchTerm}`;
    sendTelegramMessage(chat.id, findText);
    return;
  }
  if (itemCodes.length > 1) {
    const findText = `Search term for /find must resolve to a single item!
Given term: ${searchTerm}
Matched Items: ${itemCodes.map((itemCode) => itemCodeToNameMap.get(itemCode)).join(', ')}`;
    sendTelegramMessage(chat.id, findText);
    return;
  }

  const chosenItemCode = itemCodes[0];
  const items = await Item.query().where('itemCode', chosenItemCode).andWhere('quantity', '>', 0);
  const findLines = await Promise.all(items.map(async (item) => {
    if (item.telegramId === commonPoolId) {
      return `Common: ${item.quantity}`;
    }

    const responseJSON = await telegramService._sendRawRequest({ 
      telegramMethod: 'getChat', 
      request: { chat_id: item.telegramId } 
    });
    const response = await responseJSON.json();
    return `${response.ok ? response.result.first_name : 'Unknown'}: ${item.quantity}`;
  }));

  const findText = isEmpty(items) ? 'Common: 0' : findLines.join('\n');
  sendTelegramMessage(chat.id, findText);
});

updateRequests.subscribe(async (message) => {
  const { forward_date, forward_from, from, chat, text } = message;

  const commandRegex = /^\/g_(deposit|withdraw) (.+?) (\d+)$/;
  const [request, action, itemCode, quantityText, ...rest] = text.match(commandRegex);
  const multiplier = (action === 'deposit') ? 1 : -1;

  const itemName = itemCodeToNameMap.has(itemCode) ? itemCodeToNameMap.get(itemCode) : `Mystery Item ${itemCode}`;
  const quantity = multiplier * parseInt(quantityText);

  const personalItemEntry = await Item.fetchOrCreate(itemCode, from.id);
  const commonItemEntry = await Item.fetchOrCreate(itemCode, commonPoolId);

  const availableQuantity = personalItemEntry.quantity + commonItemEntry.quantity;
  const finalQuantity = availableQuantity + quantity;
  if (finalQuantity < 0) {
    const updateText = `Can only withdraw up to ${availableQuantity} ${itemName}:
Personal: ${personalItemEntry.quantity} ${itemName}
Common: ${commonItemEntry.quantity} ${itemName}`;
    sendTelegramMessage(chat.id, updateText);
    return;
  }

  const newPersonalQuantity = Math.max(personalItemEntry.quantity + quantity, 0);
  const newCommonQuantity = commonItemEntry.quantity + Math.min(personalItemEntry.quantity + quantity, 0);
  const newPersonalItemEntry = await personalItemEntry.patch({ quantity: newPersonalQuantity });
  const newCommonItemEntry = await commonItemEntry.patch({ quantity: newCommonQuantity });

  const updateText = `Processed ${quantity > 0 ? 'deposit' : 'withdrawal'} for ${Math.abs(quantity)} ${itemName}.
Personal: ${newPersonalItemEntry.quantity} (${newPersonalItemEntry.quantity < personalItemEntry.quantity ? '-' : '+'}${Math.abs(newPersonalItemEntry.quantity - personalItemEntry.quantity)})
Common: ${newCommonItemEntry.quantity} (${newCommonItemEntry.quantity < commonItemEntry.quantity ? '-' : '+'}${Math.abs(newCommonItemEntry.quantity - commonItemEntry.quantity)})`;
  sendTelegramMessage(chat.id, updateText);
});

