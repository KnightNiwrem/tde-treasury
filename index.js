const { isEmpty, isNil } = require('lodash');

//const RabbitMQService = require('./services/rabbitmq');
const TelegramService = require('./services/telegram');

const telegramService = new TelegramService();
const telegramMessageSubject = telegramService.getMessageSubject();

const makeTextMessage = (text) => {
  const chat_id = 41284431;
  return { chat_id, text };
};

telegramMessageSubject.subscribe((request) => {
  const update = request.body;
  const { message, edited_message, channel_post, edited_channel_post } = update;

  telegramService.sendMessage({ message: makeTextMessage( `Message: ${JSON.stringify(message)}`) });
  telegramService.sendMessage({ message: makeTextMessage( `Message: ${JSON.stringify(edited_message)}`) });
  telegramService.sendMessage({ message: makeTextMessage( `Message: ${JSON.stringify(channel_post)}`) });
  telegramService.sendMessage({ message: makeTextMessage( `Message: ${JSON.stringify(edited_channel_post)}`) });
});