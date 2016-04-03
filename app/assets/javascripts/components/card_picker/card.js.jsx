var SPECIAL_EFFECTS = ["unique_passive", "passive", "active"];
var titleCase = StringHelpers.titleCase;

Components.CardPicker.Card = React.createClass({

  propTypes: {
    name: React.PropTypes.string.isRequired,
    cost: React.PropTypes.number.isRequired,
    imageUrl: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
    trigger: React.PropTypes.string,
    affinity: React.PropTypes.string.isRequired,
    rarity: React.PropTypes.string.isRequired,
    effects: React.PropTypes.object.isRequired,
    fullyUpgradedEffects: React.PropTypes.object.isRequired,

    // Callbacks
    onClick: React.PropTypes.func
  },

  getInitialState: function () {
    return {
      isHovering: false
    };
  },

  onMouseOver: function (_event) {
    if (!this.state.isHovering) {
      this.setState({ isHovering: true });
    }
  },

  onMouseLeave: function (_event) {
    if (this.state.isHovering && !$(this.refs.wrapper).is(":hover")) {
      this.setState({ isHovering: false });
    }
  },

  shouldComponentUpdate: function (nextProps, nextState) {
    return !!this.state.isHovering !== !!nextState.isHovering;
  },

  render: function () {
    this._debouncedMouseLeave || (this._debouncedMouseLeave = _.debounce(this.onMouseLeave, 100));

    // TODO: Consider passing only specific props to Components.CardStats.Popover.
    return (
      <a
        ref="wrapper"
        href="javascript:void(0)"
        className="card-picker-card"
        onClick={this.props.onClick}
        onMouseOver={this.onMouseOver}
        onMouseLeave={this._debouncedMouseLeave}>
        <div className="card-picker-card-inner">
          <img src={this.props.imageUrl} alt={this.props.name} />
        </div>
        {this.state.isHovering ? (
          <Components.RenderInBody>
            {<Components.CardStats.Popover {...this.props}
              visible={this.state.isHovering} />}
          </Components.RenderInBody>
        ) : null}
      </a>
    );
  }

});
