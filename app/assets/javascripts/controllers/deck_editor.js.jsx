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

Controllers.DeckEditor = React.createClass({

  propTypes: {
    name: React.PropTypes.string,
    cards: React.PropTypes.arrayOf(React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      name: React.PropTypes.string.isRequired,
      cost: React.PropTypes.number.isRequired,
      type: React.PropTypes.string.isRequired,
      imageUrl: React.PropTypes.string.isRequired
    })).isRequired,
    selectedCardsIds: React.PropTypes.arrayOf(React.PropTypes.number),

    // Routing
    cancelURL: React.PropTypes.string
  },

  getInitialState: function () {
    return {
      name: this.props && this.props.name || "",
      cards: this.props && this.props.cards || [],
      selectedCardsIds: this.props && this.props.selectedCardsIds || [],
      selectedDeckListCardId: null,
      cancelURL: this.props && this.props.cancelURL,
    };
  },

  handleSelectCardPickerCard: function (card) {
    var selectedCardsIds = _.concat(this.state.selectedCardsIds, card.id);
    if (selectedCardsIds.length > ParagonConstants.DECK_MAX_CARDS) {
      Materialize.toast("Your deck is full.", 4000);
    }
    else {
      this.setState({
        selectedCardsIds: selectedCardsIds
      });
    }
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

  handleChangeName: function (value) {
    this.setState({
      name: value
    });
  },

  cardsForDeckList: function () {
    var cards = _.map(this.state.selectedCardsIds, function (cardId) {
      var card = getCardById(this.state.cards, cardId);
      // TODO: card.moreAvailable = something;
      return card;
    }.bind(this));

    return cards;
  },

  render: function () {
    return (
      <div className="row">
        <Components.DeckEditor.HiddenFields
          selectedCardsIds={this.state.selectedCardsIds} />
        <div className="col s12 m5 l4">
          <div className="card-panel">
            <Components.DeckList.DeckList
              name={this.state.name}
              cards={this.cardsForDeckList()}
              onChangeName={this.handleChangeName}
              onClickCard={this.handleClickDeckListCard}
              onClickDecrementCard={this.handleClickDecrementDeckListCard}
              onClickIncrementCard={this.handleClickIncrementDeckListCard}
              selectedCardId={this.state.selectedDeckListCardId}
              cancelURL={this.state.cancelURL} />
          </div>
        </div>
        <div className="col s12 m7 l8">
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
