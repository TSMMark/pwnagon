var FLASH_DURATION = 200;

Components.DeckList.DeckListCard = React.createClass({

  propTypes: {
    count: React.PropTypes.number.isRequired,
    // id: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired,
    cost: React.PropTypes.number.isRequired,
    type: React.PropTypes.string.isRequired,
    trigger: React.PropTypes.string,
    affinity: React.PropTypes.string.isRequired,
    rarity: React.PropTypes.string.isRequired,
    effects: React.PropTypes.object.isRequired,
    fullyUpgradedEffects: React.PropTypes.object.isRequired,
    imageUrl: React.PropTypes.string.isRequired,

    // Configurations
    noEdit: React.PropTypes.bool,

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
      isFlashing: false,
      isHovering: false
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
    event.preventDefault();

    if (!this.props.onClick) return;
    this.props.onClick();
  },

  handleClickDecrement: function (event) {
    event.preventDefault();

    if (!this.props.onClickDecrement) return;
    this.props.onClickDecrement();
  },

  handleClickIncrement: function (event) {
    event.preventDefault();

    if (!this.props.onClickIncrement) return;
    this.props.onClickIncrement();
  },

  handleMouseOver: function () {
    if (!this.state.isHovering) {
      this.setState({ isHovering: true });
    }
  },

  handleMouseLeave: function () {
    if (this.state.isHovering && !$(this.refs.wrapper).is(":hover")) {
      this.setState({ isHovering: false });
    }
  },

  render: function () {
    this._debouncedMouseLeave || (this._debouncedMouseLeave = _.debounce(this.handleMouseLeave, 100));

    var cardLinkClasses = classNames("card-link", {
      "is-flashing": this.state.isFlashing // TODO: is-flashing style does not work.
    });

    var imageStyle = {
      backgroundImage: "url(" + this.props.imageUrl + ")"
    }

    return (
      <div className="deck-list-card"
        ref="wrapper"
        onMouseOver={this.handleMouseOver}
        onMouseLeave={this._debouncedMouseLeave}>
        <a href="javascript:void(0);"
          className={cardLinkClasses}
          onClick={this.handleClick}>
          <div className="cost">{this.props.cost}</div>
          <div className={"rarity " + this.props.rarity}></div>
          <div className="name">{this.props.name}</div>
          <div className="image" style={imageStyle}></div>
          <div className="count">×{this.props.count}</div>
        </a>

        {!this.props.noEdit && (this.props.isSelected || this.state.isHovering) ? (
          <span className="nobs">
            <a href="javascript:void(0);" onClick={this.handleClickDecrement} className="decrement">
              <i className="material-icons medium red-text text-darken-2">remove_circle</i>
            </a>
            <a href="javascript:void(0);" onClick={this.handleClickIncrement} className="increment">
              <i className="material-icons medium green-text text-darken-1">add_circle</i>
            </a>
          </span>
        ) : null}

        <Components.RenderInBody>
          {<Components.CardStats.Popover {...this.props}
            visible={this.state.isHovering}
            ref="popover" />}
        </Components.RenderInBody>
      </div>
    );
  }

});
