const { Model } = require('objection');
const { isNil } = require('lodash');

class Item extends Model {
  static get tableName() {
    return 'items';
  }

  static async countQuantity(filter = {}) {
    const objects = await this.query().where(filter);
    return objects.reduce((total, nextObject) => {
      return total + nextObject.quantity;
    }, 0);
  }

  static async fetchOrCreate(itemCode, telegramId) {
    const object = await this.query().where({ itemCode, telegramId }).first();
    return isNil(object) ? await this.query().insert({ itemCode, quantity: 0, telegramId }) : object;
  }

  async patch(attributes) {
    const patchedObject = await this.query().patch(attributes).where('id', this.id).first().returning('*');
    return patchedObject;
  }
}

module.exports = Item;