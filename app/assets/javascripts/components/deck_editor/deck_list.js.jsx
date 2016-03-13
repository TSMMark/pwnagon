Components.DeckEditor.DeckList = React.createClass({

  propTypes: {
    cards: React.PropTypes.arrayOf(React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      name: React.PropTypes.string.isRequired,
      cost: React.PropTypes.number.isRequired,
      count: React.PropTypes.number.isRequired,
      type: React.PropTypes.string.isRequired
    })).isRequired
  },

  cardsGroupedByType: function () {
    return _.groupBy(_.orderBy(this.props.cards, ["cost", "name"]), "type");
  },

  renderCard: function (card, _index) {
    // TODO: better index;
    return (
      <li key={_index} className="deck-list-cards-list-item">
        <Components.DeckEditor.DeckListCard {...card} />
      </li>
    );
  },

  render: function () {
    var cardsGroupedByType = this.cardsGroupedByType();

    return (
      <div className="deck-list">
        <ul className="deck-list-card-types-list">
          <li className="deck-list-card-types-item">
            <h6>PrimeHelix</h6>
            <ul className="deck-list-cards-list">
              {_.map(cardsGroupedByType.PrimeHelix, this.renderCard)}
            </ul>
          </li>
          <li className="deck-list-card-types-item">
            <h6>Equipment</h6>
            <ul className="deck-list-cards-list">
              {_.map(cardsGroupedByType.Equipment, this.renderCard)}
            </ul>
          </li>
          <li className="deck-list-card-types-item">
            <h6>Upgrade</h6>
            <ul className="deck-list-cards-list">
              {_.map(cardsGroupedByType.Upgrade, this.renderCard)}
            </ul>
          </li>
        </ul>
        <input type="submit" value="Save" className="btn" />
      </div>
    );
  }

});
