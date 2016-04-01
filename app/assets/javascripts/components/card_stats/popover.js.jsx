var SPECIAL_EFFECTS = ["unique_passive", "passive", "active"];
var titleCase = StringHelpers.titleCase;

Components.CardStats.Popover = React.createClass({

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

    // State
    visible: React.PropTypes.bool.isRequired

    // Callbacks
    // onClick: React.PropTypes.func // TODO
  },

  renderEffectItem: function (value, effect) {
    return (
      <li key={effect}>
        <span className="value">{value}</span>
        <i className="agora agora-maxhealth todo-real-classname"></i> {titleCase(effect)}
      </li>
    );
  },

  renderBasicEffects: function () {
    var basicEffects = _.omit(this.props.effects, SPECIAL_EFFECTS);
    if (_.isEmpty(basicEffects)) return;

    return (
      <ul className="stats">
        {_.map(basicEffects, this.renderEffectItem)}
      </ul>
    );
  },

  renderSpecialEffects: function () {
    var speciaEffects = _.pick(this.props.effects, SPECIAL_EFFECTS);
    if (_.isEmpty(speciaEffects)) return;

    // Fancy version that we're lacking the data for:
    // <span className="card-special"> +14
    //   <span className="stat-label">
    //     <i className="pwnagon pwnagon-healthregen"></i> Health Regen
    //   </span> for 15 seconds. Charges refresh at base.
    // </span>

    return _.map(speciaEffects, function (effect, effect_type) {
      return (
        <div className="special" key={effect_type}>
          <strong>{titleCase(effect_type)}: </strong>
          <span className="card-special">
            {effect}
          </span>
        </div>
      );
    });
  },

  renderFullyUpgradedEffects: function () {
    var fullyUpgradedEffects = this.props.fullyUpgradedEffects;
    if (_.isEmpty(fullyUpgradedEffects)) return;

    return (
      <div className="maxed">
        <span className="title">Fully Upgraded Bonus</span>
        <ul className="stats">
          {_.map(fullyUpgradedEffects, this.renderEffectItem)}
        </ul>
      </div>
    );
  },

  render: function () {
    if (!this.props.visible) return (<div></div>); // TODO

    var type = this.props.type === "Equipment" ? this.props.trigger : this.props.type;

    return (
      <div className="pwnagon-popover">
        <div className="pwnagon-tooltip pwnagon-card-tooltip">

          <div className="head">
            <div className="meta">
              <div className="cost">{"Cost: " + this.props.cost}</div>
              <div className="rarity">{titleCase(this.props.rarity)}</div>
              <div className={this.props.affinity}>
                <i className={"affinity affinity-" + this.props.affinity}></i>
                {" " + titleCase(this.props.affinity)}</div>
            </div>
            <div className="name">{this.props.name}</div>
            <div className="type">{titleCase(type)}</div>
          </div>

          <div className="body">
            {this.renderBasicEffects()}
            {this.renderSpecialEffects()}
            {this.renderFullyUpgradedEffects()}
          </div>

        </div>
      </div>
    );
  }

});
