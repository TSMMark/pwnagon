Components.DeckEditor.DeckListCard = React.createClass({

  propTypes: {
    name: React.PropTypes.string.isRequired,
    cost: React.PropTypes.number.isRequired,
    count: React.PropTypes.number.isRequired,

    // State
    isSelected: React.PropTypes.bool,

    // Callbacks
    onClick: React.PropTypes.func,
    onClickDecrement: React.PropTypes.func,
    onClickIncrement: React.PropTypes.func
  },

  handleClick: function (event) {
    if (!this.props.onClick) return;
    this.props.onClick();
  },

  handleClickDecrement: function (event) {
    if (!this.props.onClickDecrement) return;
    this.props.onClickDecrement();
  },

  handleClickIncrement: function (event) {
    if (!this.props.onClickIncrement) return;
    this.props.onClickIncrement();
  },

  render: function () {
    return (
      <div className="deck-list-card">
        <a
          href="javascript:void(0);"
          className="card-link"
          onClick={this.handleClick}>
          <span className="card-cost">({this.props.cost})</span>
          <span className="card-name">{this.props.name}</span>
          <span className="card-count">x{this.props.count}</span>
        </a>
        {this.props.isSelected ? (
          <span className="card-count-nobs">
            <a href="javascript:void(0);" onClick={this.handleClickDecrement} className="decrement">
              [<span className="material-icons">remove_circle</span>]
            </a>
            <a href="javascript:void(0);" onClick={this.handleClickIncrement} className="increment">
              [<span className="material-icons">add_circle</span>]
            </a>
          </span>
        ) : null}
      </div>
    );
  }

});
