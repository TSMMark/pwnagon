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
      votesScore: React.PropTypes.number.isRequired,
      hotScore: React.PropTypes.number,
      commentsCount: React.PropTypes.number.isRequired
    })).isRequired
  },

  componentDidMount: function() {
    var $masonry = $(this.refs["masonry-grid"]);

    $masonry.masonry({
      columnWidth: ".col",
      itemSelector: ".col",
    });

    $masonry.imagesLoaded().progress(function () {
      $masonry.masonry("layout");
    });
  },

  componentWillUnmount: function() {
    $(this.refs["masonry-grid"]).masonry("destroy");
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
      <div ref="masonry-grid" className="row">
        {_.map(this.props.decks, this.renderDeckGlance)}
      </div>
    );
  }

});
