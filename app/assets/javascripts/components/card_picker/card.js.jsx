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
    if (this.state.isHovering === true) return;
    this.setState({ isHovering: true });
  },

  onMouseLeave: function (_event) {
    if (this.state.isHovering === false) return;
    this.setState({ isHovering: false });
  },

  render: function () {
    // TODO: Consider passing only specific props to Components.CardStats.Popover.
    return (
      <a
        href="javascript:void(0)"
        className="card-picker-card"
        onClick={this.props.onClick}
        onMouseOver={this.onMouseOver}
        onMouseLeave={this.onMouseLeave}>
        <div className="card-picker-card-inner">
          <img src={this.props.imageUrl} alt={this.props.name} />
        </div>
        {<Components.CardStats.Popover {...this.props}
          visible={this.state.isHovering} />}
      </a>
    );
  }

});
