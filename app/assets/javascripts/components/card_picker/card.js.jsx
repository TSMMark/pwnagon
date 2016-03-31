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
    fully_upgraded_effects: React.PropTypes.object.isRequired,

    // Callbacks
    onClick: React.PropTypes.func
  },

  getInitialState: function () {
    return {
      isHovering: false
    };
  },

  onMouseOver: function (_event) {
    this.setState({ isHovering: true });
  },

  onMouseLeave: function (_event) {
    this.setState({ isHovering: false });
  },

  renderPopover: function () {
    if (!this.state.isHovering) return;

    // TODO:
    //  - classNames
    //  - trigger
    //  - effects

    var type = this.props.type === "Equipment" ? this.props.trigger : this.props.type;


    return (
      <div className="pwnagon-popover">
        <div className="pwnagon-tooltip pwnagon-card-tooltip">
          <div className="head">
            <div className="meta">
              <div className="cost">{"Cost: " + this.props.cost}</div>
              <div className="rarity">{this.props.rarity}</div>
              <div className="universal"><i className="affinity affinity-universal"></i> {this.props.affinity}</div>
            </div>
            <div className="name">{this.props.name}</div>
            <div className="type">{type}</div>
          </div>
          <div className="body">
            <div className="special"><strong>Unique Active:</strong> <span className="card-special"> +14 <span className="stat-label"><i className="pwnagon pwnagon-healthregen"></i> Health Regen</span> for 15 seconds. Charges refresh at base.</span></div>
          </div>
        </div>
      </div>
    );
  },

  render: function () {
    return (
      <a
        href="javascript:void(0)"
        className="card-picker-card"
        onClick={this.props.onClick}
        onMouseOver={this.onMouseOver}
        onMouseLeave={this.onMouseLeave}>
        <div className="card-picker-card-inner">
          <img src={this.props.imageUrl} alt={this.props.name} />
          <h1 className="card-picker-card-name">{this.props.name}</h1>
        </div>
        {this.renderPopover()}
      </a>
    );
  }

});
