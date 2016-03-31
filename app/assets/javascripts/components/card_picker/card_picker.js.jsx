var CARD_TYPE_ORDER_MAP = {
  "PrimeHelix": 0,
  "Equipment": 1,
  "Upgrade": 2
}

// A card matches if it includes the series of characters in order,
// even if there are other characters in between.
// i.e. searchTerm "wcb" matches string "Windcarver Blade".
var stringMatchesTerm = function (string, searchTerm) {
  if (!searchTerm) return true;
  searchTerm = _.map(searchTerm.split(""), function (slice) {
    return _.escapeRegExp(slice);
  }).join(".*");
  var searchTermRegExp = new RegExp(searchTerm, "i");
  return !!string.match(searchTermRegExp);
}

Components.CardPicker.CardPicker = React.createClass({

  propTypes: {
    cards: React.PropTypes.arrayOf(React.PropTypes.shape({
      // id: React.PropTypes.number.isRequired, // This is unused.
      name: React.PropTypes.string.isRequired,
      cost: React.PropTypes.number.isRequired,
      imageUrl: React.PropTypes.string.isRequired
    })).isRequired,

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

  handleKeyPressSearch: function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      var firstMatchingCard = _.first(this.filteredCards());
      if (firstMatchingCard) {
        this.handleClickCard(firstMatchingCard);
      }
    }
  },

  filteredCards: function () {
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

    return filteredCards;
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
    var filteredCards = this.filteredCards();

    return (
      <div className="card-picker">
        <Components.StickScroll.StickScroll>
          <Components.Forms.MaterializeTextField
            id="cards_search"
            value={this.state.searchTerm}
            label="Search cards by name"
            onChange={this.handleChangeSearchTerm}
            onKeyPress={this.handleKeyPressSearch}
            className="card-header-input-field" />
        </Components.StickScroll.StickScroll>

          {filteredCards.length > 0 ? (
            <ul className="card-picker-cards-list">
              {_.map(filteredCards, this.renderCard)}
            </ul>
          ) : (
            <div>
              <h5>No results...</h5>
              <p>Please keep in mind we are in very early Alpha and we may be missing a few cards.</p>
            </div>
          )}
      </div>
    );
  }

});
