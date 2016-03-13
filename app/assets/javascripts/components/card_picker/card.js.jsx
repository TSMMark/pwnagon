Components.CardPicker.Card = React.createClass({

  propTypes: {
    name: React.PropTypes.string.isRequired,
    cost: React.PropTypes.number.isRequired,

    // Callbacks
    onClick: React.PropTypes.func
  },

  render: function () {
    return (
      <a
        href="javascript:void(0)"
        onClick={this.props.onClick}
        className="card-picker-card">
        <span className="card-picker-card-cost">{this.props.cost}</span>
        <div className="card-picker-card-inner valign-wrapper">
          <h1 className="card-picker-card-name valign">{this.props.name}</h1>
        </div>
      </a>
    );
  }

});
