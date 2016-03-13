var getCardById = function (cards, cardId) {
  return _.find(cards, function (card) {
    return card.id === cardId;
  });
}

// Remove the first occurrence of `item` from `list`.
var decrementListItem = function (list, item) {
  var alreadyRemovedOnce = false;

  return _.reduce(list, function (newList, listItem) {
    if (alreadyRemovedOnce || listItem !== item) {
      newList.push(listItem);
    } else {
      alreadyRemovedOnce = true;
    }

    return newList;
  }, []);
}

var applyCounts = function (cards) {
  return _.reduce(cards, function (cards, card) {
    var alreadyPresentCard = getCardById(cards, card.id);
    if (alreadyPresentCard) {
      alreadyPresentCard.count += 1;
    }
    else {
      card.count = 1;
      cards.push(card);
    }
    return cards;
  }, []);
}

Controllers.DeckEditor = React.createClass({

  propTypes: {
    cards: React.PropTypes.arrayOf(React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      name: React.PropTypes.string.isRequired,
      cost: React.PropTypes.number.isRequired,
      type: React.PropTypes.string.isRequired
    })).isRequired,
    selectedCardsIds: React.PropTypes.arrayOf(React.PropTypes.number),
  },

  getInitialState: function () {
    return {
      cards: this.props && this.props.cards || [],
      selectedCardsIds: this.props && this.props.selectedCardsIds || [],
      selectedDeckListCardId: null
    };
  },

  handleSelectCardPickerCard: function (card) {
    var selectedCardsIds = _.concat(this.state.selectedCardsIds, card.id);
    this.setState({
      selectedCardsIds: selectedCardsIds
    });
  },

  handleClickDecrementDeckListCard: function (card) {
    var selectedCardsIds = decrementListItem(this.state.selectedCardsIds, card.id);

    this.setState({
      selectedCardsIds: selectedCardsIds
    });
  },

  handleClickIncrementDeckListCard: function (card) {
    var selectedCardsIds = _.concat(this.state.selectedCardsIds, card.id);
    this.setState({
      selectedCardsIds: selectedCardsIds
    });
  },

  handleClickDeckListCard: function (card) {
    this.setState({
      selectedDeckListCardId: this.state.selectedDeckListCardId === card.id ? null : card.id
    });
  },

  cardsForDeckList: function () {
    var cards = _.map(this.state.selectedCardsIds, function (cardId) {
      var card = getCardById(this.state.cards, cardId);
      // TODO: card.moreAvailable = something;
      return card;
    }.bind(this));

    cards = applyCounts(cards);

    return cards;
  },

  render: function () {
    return (
      <div className="row">
        <Components.DeckEditor.HiddenFields
          selectedCardsIds={this.state.selectedCardsIds} />
        <div className="col s12 m4">
          <div className="card-panel">
            <Components.DeckEditor.DeckList
              cards={this.cardsForDeckList()}
              onClickCard={this.handleClickDeckListCard}
              onClickDecrementCard={this.handleClickDecrementDeckListCard}
              onClickIncrementCard={this.handleClickIncrementDeckListCard}
              selectedCardId={this.state.selectedDeckListCardId} />
          </div>
        </div>
        <div className="col s12 m8">
          <div className="card-panel">
            <Components.CardPicker.CardPicker
              cards={this.state.cards}
              onSelectCard={this.handleSelectCardPickerCard} />
          </div>
        </div>
      </div>
    );
  }

});
