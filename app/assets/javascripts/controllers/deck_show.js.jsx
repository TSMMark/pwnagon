Controllers.DeckShow = React.createClass({

  propTypes: {
    name: React.PropTypes.string,
    // TODO: pull out model proptype definition into submodules.
    cards: React.PropTypes.arrayOf(React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      name: React.PropTypes.string.isRequired,
      cost: React.PropTypes.number.isRequired,
      type: React.PropTypes.string.isRequired
    })).isRequired
  },

  getInitialState: function () {
    return {
      name: this.props && this.props.name || "",
      cards: this.props && this.props.cards || []
    };
  },

  render: function () {
    // TODO:
    //  - Conditionally make deck.name field a header instead of a text field.
    //  - Kill save and cancel buttons.
    //  - Don't remove hover effect.
    //  - On hover card, show details.
    //  - Use lack-of callback presense in Components.DeckList.DeckList as an
    //    indicator when possible.

    // TODO: add extra information section here.

    return (
      <div className="row">
        <div className="col s12 m5 l4">
          <div className="card-panel">
            <Components.DeckList.DeckList
              name={this.state.name}
              cards={this.props.cards}
              // onChangeName={this.handleChangeName}
              // onClickCard={this.handleClickDeckListCard}
              // onClickDecrementCard={this.handleClickDecrementDeckListCard}
              // onClickIncrementCard={this.handleClickIncrementDeckListCard}
              // selectedCardId={this.state.selectedDeckListCardId}
              // cancelURL={this.state.cancelURL}
              />
          </div>
        </div>
      </div>
    );
  }

});
