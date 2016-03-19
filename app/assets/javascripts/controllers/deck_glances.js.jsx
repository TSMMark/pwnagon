Controllers.DeckGlances = React.createClass({

  propTypes: {
    decks: React.PropTypes.arrayOf(React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      name: React.PropTypes.string.isRequired,
      authorId: React.PropTypes.number.isRequired,
      authorName: React.PropTypes.string.isRequired,
      description: React.PropTypes.string.isRequired,
      createdAt: React.PropTypes.string.isRequired,
      updatedAt: React.PropTypes.string.isRequired,
      heroName: React.PropTypes.string.isRequired,
      heroAvatarUrl: React.PropTypes.string.isRequired
    })).isRequired
  },

  getInitialState: function () {
    return {
      decks: this.props && this.props.decks || []
    };
  },

  render: function () {
    var decks = _.map(this.state.decks, function (deck) {
      deck = _.clone(deck);

      deck.createdAt = new Date(deck.createdAt);
      deck.updatedAt = new Date(deck.updatedAt);

      return deck;
    });

    return (
      <div className="deck-glances">
        <Components.DeckGlance.Grid decks={decks} />
      </div>
    );
  }

});
