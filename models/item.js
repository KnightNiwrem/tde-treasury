const { Model } = require('objection');

class Item extends Model {
  static get tableName() {
    return 'items';
  }
}

module.exports = Item;