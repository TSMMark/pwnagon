var React = require("react");
var Popover = require("react-popover");
console.log("TODO: remove this line", Popover);

Components.CardPicker.Card = React.createClass({

  propTypes: {
    name: React.PropTypes.string.isRequired,
    cost: React.PropTypes.number.isRequired,
    imageUrl: React.PropTypes.string.isRequired,

    // Callbacks
    onClick: React.PropTypes.func
  },

  getInitialState: function () {
    return {
      isHovering: false
    };
  },

  handleMouseOver: function () {
    this.setState({ isHovering: true });
  },

  handleMouseOut: function () {
    this.setState({ isHovering: false });
  },

  renderContents: function (isHovering) {
    return (
      <a
        href="javascript:void(0)"
        onClick={this.props.onClick}
        className={classNames("card-picker-card", "target", {isHovering})}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}>
        <div className="card-picker-card-inner">
          <img src={this.props.imageUrl} alt={this.props.name} />
          <h1 className="card-picker-card-name">{this.props.name}</h1>
        </div>
      </a>
    );
  },

  renderPopover: function () {
    var isHovering = this.state.isHovering;
    return (<p>hi</p>);

    return (
      <Popover isOpen={isHovering} body="Boo!">
        {this.renderContents(isHovering)}
      </Popover>
    );
  },

  render: function () {
    return this.renderPopover();
  }

});

//<div className="agora-tooltip agora-card-tooltip">
//  <div className="head">
//    <div className="meta">
//      <span>Cost: 1</span>
//      <span>Starter</span>
//      <span className="universal"><i className="affinity affinity-universal"></i> Universal</span>
//    </div>
//    <div className="name">Health Potion</div>
//    <div className="type">Active</div>
//  </div>
//  <div className="body">
//    <div className="special"><strong>Unique Active:</strong> <span className="card-special"> +14 <span className="stat-label"><i className="agora agora-healthregen"></i> Health Regen</span> for 15 seconds. Charges refresh at base.</span></div>
//  </div>
//</div>
