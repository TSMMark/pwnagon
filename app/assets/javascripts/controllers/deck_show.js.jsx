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
      </div>
    );
  }

});
