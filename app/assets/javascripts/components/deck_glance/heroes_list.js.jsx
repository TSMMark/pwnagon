Components.DeckGlance.HeroesList = React.createClass({

  propTypes: {
    heroes: React.PropTypes.arrayOf(React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      name: React.PropTypes.string.isRequired,
      avatarUrl: React.PropTypes.string.isRequired
    })).isRequired,

    // State
    selectedHeroId: React.PropTypes.number,

    // Callbacks
    onClick: React.PropTypes.func
  },

  handleClickHero: function (hero, event) {
    event.preventDefault();

    if (!this.props.onClick) return;

    this.props.onClick(hero);
  },

  renderHero: function (hero) {
    var margin = 1;
    var allHeroesCount = this.props.heroes.length;
    var percentagePerItem = 100.0 / allHeroesCount - margin;

    var styles = {
      marginLeft: (margin / 2.0) + "%",
      marginRight: (margin / 2.0) + "%",
      width: percentagePerItem + "%"
    }

    var isSelected = hero.id === this.props.selectedHeroId;
    var classes = classNames("heroes-grid-item", {
      "is-selected": isSelected
    });

    return (
      <a key={hero.id}
        onClick={this.handleClickHero.bind(this, hero)}
        href="javascript:void(0);"
        className={classes}
        style={styles}>
        <img src={hero.avatarUrl} className="hero-image" />
        <h6 className="hero-name">{hero.name}</h6>
      </a>
    );
  },

  render: function () {
    // TODO: Add option to show "all" heroes / remove hero filter.
    return (
      <div className="heroes-grid percentage-width">
        {_.map(this.props.heroes, this.renderHero)}
      </div>
    );
  }

});
