Components.CardPicker.Card = React.createClass({

  propTypes: {
    name: React.PropTypes.string.isRequired,
    cost: React.PropTypes.number.isRequired,
    imageUrl: React.PropTypes.string.isRequired,

    // Callbacks
    onClick: React.PropTypes.func
  },

  render: function () {
    return (
      <a
        href="javascript:void(0)"
        onClick={this.props.onClick}
        className="card-picker-card">
        <div className="card-picker-card-inner">
          <img src={this.props.imageUrl} alt={this.props.name} />
          <h1 className="card-picker-card-name">{this.props.name}</h1>
        </div>
      </a>
    );
  }

});
