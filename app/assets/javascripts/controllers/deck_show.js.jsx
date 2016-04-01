Controllers.DeckShow = React.createClass({

  propTypes: {
    deckId: React.PropTypes.number.isRequired,
    name: React.PropTypes.string,

    // TODO: pull out model proptype definition into submodules.
    cards: React.PropTypes.arrayOf(React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      name: React.PropTypes.string.isRequired,
      cost: React.PropTypes.number.isRequired,
      type: React.PropTypes.string.isRequired,
      trigger: React.PropTypes.string,
      affinity: React.PropTypes.string.isRequired,
      rarity: React.PropTypes.string.isRequired,
      effects: React.PropTypes.object.isRequired,
      fullyUpgradedEffects: React.PropTypes.object.isRequired,
      imageUrl: React.PropTypes.string.isRequired
    })).isRequired,

    comments: React.PropTypes.arrayOf(React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      authorName: React.PropTypes.string.isRequired,
      body: React.PropTypes.string.isRequired
      // TODO: updatedAt
    })).isRequired
  },

  getInitialState: function () {
    return {
      deckId: this.props && this.props.deckId,
      name: this.props && this.props.name || "",
      cards: this.props && this.props.cards || [],
      comments: this.props && this.props.comments || []
    };
  },

  render: function () {
    return (
      <div className="row">
        <div className="col s12 m5 l4">
          <div className="card-panel">
            <Components.DeckList.DeckList
              name={this.state.name}
              cards={this.props.cards}
              noEdit={true} />
          </div>
        </div>
        <div className="col s12 m7 l8">
          <Components.Comments.CommentsList
            deckId={this.state.deckId}
            comments={this.state.comments} />
        </div>
      </div>
    );
  }

});
