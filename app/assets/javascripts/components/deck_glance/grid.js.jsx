Components.DeckGlance.Grid = React.createClass({

  propTypes: {
    decks: React.PropTypes.arrayOf(React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      name: React.PropTypes.string.isRequired,
      authorId: React.PropTypes.number.isRequired,
      authorName: React.PropTypes.string.isRequired,
      description: React.PropTypes.string.isRequired,
      createdAt: React.PropTypes.instanceOf(Date).isRequired,
      updatedAt: React.PropTypes.instanceOf(Date).isRequired,
      heroId: React.PropTypes.number.isRequired,
      heroName: React.PropTypes.string.isRequired,
      heroAvatarUrl: React.PropTypes.string.isRequired,
      votesScore: React.PropTypes.number.isRequired
    })).isRequired
  },

  renderDeckGlance: function (deck) {
    return (
      <div className="col s12 m6 l6" key={deck.id}>
        <Components.DeckGlance.DeckGlance {...deck} />
      </div>
    );
  },

  render: function () {
    return (
      <div className="deck-glance-grid">
        <div className="row">
          {_.map(this.props.decks, this.renderDeckGlance)}
        </div>
      </div>
    );
  }

});
