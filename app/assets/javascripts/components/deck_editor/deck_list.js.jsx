var CANCEL_WARNING = "You changes will not be saved. Are you sure?";

var wrapWithTransitionGroup = function (children) {
  return (
    <React.addons.CSSTransitionGroup
      transitionName="deck-list-cards"
      transitionEnterTimeout={200}
      transitionLeaveTimeout={1}>
      {children}
    </React.addons.CSSTransitionGroup>
  );
}

Components.DeckEditor.DeckList = React.createClass({

  propTypes: {
    name: React.PropTypes.string,
    cards: React.PropTypes.arrayOf(React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      name: React.PropTypes.string.isRequired,
      cost: React.PropTypes.number.isRequired,
      count: React.PropTypes.number.isRequired, // TODO: Make this component do the counting. Then we can plug n play it anywhere.
      type: React.PropTypes.string.isRequired
    })).isRequired,

    // Routing
    cancelURL: React.PropTypes.string,

    // State
    selectedCardId: React.PropTypes.number,

    // Callbacks
    onClickCard: React.PropTypes.func,
    onClickDecrementCard: React.PropTypes.func,
    onClickIncrementCard: React.PropTypes.func,
    onChangeName: React.PropTypes.func
  },

  handleClickCard: function (card) {
    if (!this.props.onClickCard) return;
    this.props.onClickCard(card);
  },

  handleClickDecrementCard: function (card) {
    if (!this.props.onClickDecrementCard) return;
    this.props.onClickDecrementCard(card);
  },

  handleClickIncrementCard: function (card) {
    if (!this.props.onClickIncrementCard) return;
    this.props.onClickIncrementCard(card);
  },

  handleChangeName: function (value, _event) {
    if (!this.props.onChangeName) return;
    this.props.onChangeName(value);
  },

  cardsGroupedByType: function () {
    return _.groupBy(_.orderBy(this.props.cards, ["cost", "name"]), "type");
  },

  cardSlotsUsed: function () {
    return _.reduce(this.props.cards, function (count, card) {
      return count + card.count;
    }, 0);
  },

  renderCard: function (card, _index) {
    return (
      <li key={card.id} className="deck-list-cards-list-item">
        <Components.DeckEditor.DeckListCard {...card}
          onClick={this.handleClickCard.bind(this, card)}
          onClickDecrement={this.handleClickDecrementCard.bind(this, card)}
          onClickIncrement={this.handleClickIncrementCard.bind(this, card)}
          isSelected={card.id === this.props.selectedCardId} />
      </li>
    );
  },

  render: function () {
    var cardsGroupedByType = this.cardsGroupedByType();

    // TODO: Conditionally make name field editable.
    return (
      <div className="deck-list">
        <Components.Forms.MaterializeTextField
          name="deck[name]"
          id="deck_name"
          value={this.props.name}
          label="Deck Name"
          onChange={this.handleChangeName} />
        <h6 className="deck-list-cards-count-header">
          Card slots used: {this.cardSlotsUsed()} / {ParagonConstants.DECK_MAX_CARDS}
        </h6>
        <ul className="deck-list-card-types-list">
          <li className="deck-list-card-types-item">
            <h6>PrimeHelix</h6>
            <ul className="deck-list-cards-list">
              {wrapWithTransitionGroup(
                _.map(cardsGroupedByType.PrimeHelix, this.renderCard)
              )}
            </ul>
          </li>
          <li className="deck-list-card-types-item">
            <h6>Equipments</h6>
            <ul className="deck-list-cards-list">
              {wrapWithTransitionGroup(
                _.map(cardsGroupedByType.Equipment, this.renderCard)
              )}
            </ul>
          </li>
          <li className="deck-list-card-types-item">
            <h6>Upgrades</h6>
            <ul className="deck-list-cards-list">
              {wrapWithTransitionGroup(
                _.map(cardsGroupedByType.Upgrade, this.renderCard)
              )}
            </ul>
          </li>
        </ul>
        <ul className="deck-list-actions">
          <li><input type="submit" value="Save" className="btn" /></li>
          <li><a href={this.props.cancelURL} className="btn-flat" data-confirm={CANCEL_WARNING}>Cancel</a></li>
        </ul>
      </div>
    );
  }

});
