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
        {this.props.name} ({this.props.cost})
      </a>
    );
  }

});
