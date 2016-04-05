Controllers.DeckGlances = React.createClass({

  propTypes: {
    heroes: React.PropTypes.arrayOf(React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      name: React.PropTypes.string.isRequired,
      avatarUrl: React.PropTypes.string.isRequired
    })).isRequired,

    decks: React.PropTypes.arrayOf(React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      name: React.PropTypes.string.isRequired,
      authorId: React.PropTypes.number.isRequired,
      authorName: React.PropTypes.string,
      description: React.PropTypes.string.isRequired,
      createdAt: React.PropTypes.string.isRequired,
      updatedAt: React.PropTypes.string.isRequired,
      heroId: React.PropTypes.number.isRequired,
      heroName: React.PropTypes.string.isRequired,
      heroAvatarUrl: React.PropTypes.string.isRequired,
      votesScore: React.PropTypes.number.isRequired,
      hotScore: React.PropTypes.number,
      commentsCount: React.PropTypes.number.isRequired
    })).isRequired,

    // State
    selectedHeroId: React.PropTypes.number
  },

  getInitialState: function () {
    return {
      heroes: this.props && this.props.heroes || [],
      decks: this.props && this.props.decks || [],

      selectedHeroId: this.props && this.props.selectedHeroId || null
    };
  },

  handleClickHero: function (hero) {
    var selectedHeroId;

    if (this.state.selectedHeroId === hero.id) {
      selectedHeroId = null;
    }
    else {
      selectedHeroId = hero.id;
    }

    this.setState({
      selectedHeroId: selectedHeroId
    });
  },

  filteredDecks: function () {
    if (this.state.selectedHeroId) {
      return _.filter(this.state.decks, function (deck) {
        return deck.heroId === this.state.selectedHeroId;
      }.bind(this));
    }
    else {
      return this.state.decks;
    }
  },

  render: function () {
    var decks = this.filteredDecks();

    decks = _.map(decks, function (deck) {
      deck = _.clone(deck);

      deck.createdAt = new Date(deck.createdAt);
      deck.updatedAt = new Date(deck.updatedAt);

      return deck;
    });

    return (
      <div className="deck-glances">
        <Components.DeckGlance.HeroesList
          heroes={this.state.heroes}
          selectedHeroId={this.state.selectedHeroId}
          onClick={this.handleClickHero} />
        <Components.DeckGlance.Grid decks={decks} />
      </div>
    );
  }

});
