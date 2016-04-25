import _ from "lodash"

var CardUtils = {

  getCardById: function (cards, cardId) {
    return _.find(cards, function (card) {
      return card.id.toString() === cardId.toString();
    });
  }

};

module.exports = CardUtils;
