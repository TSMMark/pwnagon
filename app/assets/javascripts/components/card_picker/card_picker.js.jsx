var CARD_TYPE_ORDER_MAP = {
  "PrimeHelix": 0,
  "Equipment": 1,
  "Upgrade": 2
}

Components.CardPicker.CardPicker = React.createClass({

  propTypes: {
    cards: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,

    // Callbacks
    onSelectCard: React.PropTypes.func
  },

  handleClickCard: function (card, event) {
    if (!this.props.onSelectCard) return;

    this.props.onSelectCard(card);
  },

  renderCard: function (card, _index) {
    return (
      <li key={card.id} className="card-picker-cards-list-item">
        <Components.CardPicker.Card
          onClick={this.handleClickCard.bind(this, card)}
          {...card} />
      </li>
    );
  },

  render: function () {
    // TODO: filters.
    var filteredCards = _.clone(this.props.cards);
    _.each(filteredCards, function (card) {
      // Used for ordering by category.
      card.typeIndex = CARD_TYPE_ORDER_MAP[card.type];
    });
    filteredCards = _.orderBy(filteredCards,
      ["typeIndex", "cost", "name"],
      ["asc", "asc", "asc"]);

    return (
      <ul className="card-picker-cards-list">
        {_.map(filteredCards, this.renderCard)}
      </ul>
    );
  }

});
