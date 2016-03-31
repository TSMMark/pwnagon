var React = require("react");
var FLASH_DURATION = 200;

Components.DeckList.DeckListCard = React.createClass({

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

  getDefaultProps: function () {
    return {};
  },

  getInitialState: function() {
    return {
      isFlashing: false
    };
  },

  componentWillReceiveProps: function (nextProps) {
    var newIsFlashing = this.props.count !== nextProps.count;

    if (newIsFlashing !== this.state.isFlashing) {
      this.setState({
        isFlashing: newIsFlashing
      });
      clearTimeout(this.__flashTimeout);
      this.__flashTimeout = setTimeout(this.stopFlashing, FLASH_DURATION);
    }
  },

  componentWillUnmount: function () {
    clearTimeout(this.__flashTimeout);
  },

  stopFlashing: function () {
    this.setState({
      isFlashing: false
    });
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
    var cardLinkClasses = classNames("card-link", {
      "is-flashing": this.state.isFlashing
    });

    return (
      <div className="deck-list-card">
        <a
          href="javascript:void(0);"
          className={cardLinkClasses}
          onClick={this.handleClick}>
          <span className="card-cost">({this.props.cost})</span>
          <span className="card-name">{this.props.name}</span>
          <span className="card-count">x{this.props.count}</span>
        </a>
        {this.props.isSelected ? (
          <span className="card-count-nobs">
            <a href="javascript:void(0);" onClick={this.handleClickDecrement} className="decrement">
              <i className="material-icons red-text">remove_circle</i>
            </a>
            <a href="javascript:void(0);" onClick={this.handleClickIncrement} className="increment">
              <i className="material-icons green-text">add_circle</i>
            </a>
          </span>
        ) : null}
      </div>
    );
  }

});
