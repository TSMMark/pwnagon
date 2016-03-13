Components.DeckEditor.DeckListCard = React.createClass({

  propTypes: {
    name: React.PropTypes.string.isRequired,
    cost: React.PropTypes.number.isRequired,
    count: React.PropTypes.number.isRequired,

    // Callbacks
    onClick: React.PropTypes.func
  },

  render: function () {
    return (
      <a
        href="javascript:void(0)"
        onClick={this.props.onClick}
        className="deck-list-card">
        <span className="card-cost">({this.props.cost})</span>
        <span className="card-name">{this.props.name}</span>
        <span className="card-count">x{this.props.count}</span>
      </a>
    );
  }

});
