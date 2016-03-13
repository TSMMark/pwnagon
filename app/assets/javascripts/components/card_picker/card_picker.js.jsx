var CARD_TYPE_ORDER_MAP = {
  "PrimeHelix": 0,
  "Equipment": 1,
  "Upgrade": 2
}

var stringMatchesTerm = function (string, searchTerm) {
  return _.includes(string.toLowerCase(), searchTerm.toLowerCase());
}

Components.CardPicker.CardPicker = React.createClass({

  propTypes: {
    cards: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,

    // Callbacks
    onSelectCard: React.PropTypes.func
  },

  getInitialState: function() {
    return {
      searchTerm: ""
    };
  },

  handleClickCard: function (card, _event) {
    if (!this.props.onSelectCard) return;

    this.props.onSelectCard(card);
  },

  handleChangeSearchTerm: function (value, _event) {
    this.setState({ searchTerm: value });
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
    // TODO: This can be optimized by performing once in controller on change.
    var filteredCards = _.filter(this.props.cards, function (card) {
      return stringMatchesTerm(card.name, this.state.searchTerm);
    }.bind(this));

    filteredCards = _.clone(filteredCards);
    _.each(filteredCards, function (card) {
      // Used for ordering by category.
      card.typeIndex = CARD_TYPE_ORDER_MAP[card.type];
    });
    filteredCards = _.orderBy(filteredCards,
      ["typeIndex", "cost", "name"],
      ["asc", "asc", "asc"]);

    return (
      <div className="card-picker">
        <Components.Forms.MaterializeTextField
          id="cards_search"
          value={this.state.searchTerm}
          label="Search cards by name"
          onChange={this.handleChangeSearchTerm} />
        <ul className="card-picker-cards-list">
          {_.map(filteredCards, this.renderCard)}
        </ul>
      </div>
    );
  }

});
