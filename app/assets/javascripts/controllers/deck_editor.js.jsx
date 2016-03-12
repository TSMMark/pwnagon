var getCardById = function (cards, cardId) {
  return _.find(cards, function (card) {
    return card.id === cardId;
  });
}

Controllers.DeckEditor = React.createClass({

  propTypes: {
    cards: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    selectedCardsIds: React.PropTypes.arrayOf(React.PropTypes.number),
  },

  getInitialState: function () {
    return {
      cards: this.props && this.props.cards || [],
      selectedCardsIds: this.props && this.props.selectedCardsIds || []
    };
  },

  handleSelectCard: function (card) {
    var selectedCardsIds = _.concat(this.state.selectedCardsIds, card.id);
    this.setState({
      selectedCardsIds: selectedCardsIds
    });
  },

  cardsForDeckList: function () {
    return _.map(this.state.selectedCardsIds, function (cardId) {
      var card = getCardById(this.state.cards, cardId);
      // TODO: card.moreAvailable = something;
      return card;
    }.bind(this));
  },

  render: function () {
    return (
      <div className="row">
        <div className="col s12 m4">
          <div className="card-panel">
            <Components.DeckEditor.DeckList
              cards={this.cardsForDeckList()} />
          </div>
        </div>
        <div className="col s12 m8">
          <div className="card-panel">
            <Components.CardPicker.CardPicker
              cards={this.state.cards}
              onSelectCard={this.handleSelectCard} />
          </div>
        </div>
      </div>
    );
  }

});
