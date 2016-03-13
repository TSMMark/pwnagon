var TEXT_INPUT_PROP_KEYS = ["value", "name", "id"];

Components.Forms.MaterializeTextField = React.createClass({

  propTypes: {
    // Input
    value: React.PropTypes.string,
    name: React.PropTypes.string,
    id: React.PropTypes.string,
    label: React.PropTypes.string,

    // Wrapper
    className: React.PropTypes.string,

    // Callbacks
    onChange: React.PropTypes.func.isRequired
  },

  handleChange: function (event) {
    return this.props.onChange(event.target.value, event);
  },

  render: function () {
    var textInputProps = _.pick(this.props, TEXT_INPUT_PROP_KEYS);
    var classes = classNames("input-field", this.props.className);

    return (
      <div className={classes}>
        <input type="text"
          {...textInputProps}
          onChange={this.handleChange} />
        <label htmlFor={this.props.id}>{this.props.label}</label>
      </div>
    );
  }

});
