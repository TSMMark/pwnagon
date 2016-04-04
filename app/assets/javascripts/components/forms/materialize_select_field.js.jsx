var INPUT_PROP_KEYS = ["defaultValue", "name", "id", "multiple", "autoFocus"];
var titleCase = StringHelpers.titleCase;

Components.Forms.MaxterializeSelectField = React.createClass({

  propTypes: {
    // Input
    defaultValue: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.array]),
    name: React.PropTypes.string,
    id: React.PropTypes.string,
    multiple: React.PropTypes.bool,
    options: React.PropTypes.array.isRequired,
    blank: React.PropTypes.string.isRequired,
    autoFocus: React.PropTypes.bool,

    // Label
    label: React.PropTypes.string,

    // Wrapper
    className: React.PropTypes.string,

    // Callbacks
    onChange: React.PropTypes.func
  },

  componentDidMount: function () {
    // TODO: Mixin for components that want autoFocus behavior.
    if (this.props.autoFocus) {
      setTimeout(function () {
        $(this.refs.input).focus();
      }.bind(this), 0);
    }

    $(this.refs.input).material_select(this.handleChange);
  },

  componentWillUnmount: function () {
    $(this.refs.input).material_select("destroy");
  },

  handleChange: function () {
    if (!this.props.onChange) return;

    var value = $(this.refs.input).val();
    return this.props.onChange(value);
  },

  render: function () {
    var inputProps = _.pick(this.props, INPUT_PROP_KEYS);
    var classes = classNames("input-field", this.props.className);

    // TODO: More versatile options. Allow passing children as options.
    inputProps["defaultValue"] || (inputProps["defaultValue"] = this.props.multiple ? [""] : "");

    return (
      <div className={classes}>
        <select ref="input"
          {...inputProps}
          onChange={$.noop}>
          <option key="blank" value="" disabled={true}>{this.props.blank}</option>
          {_.map(this.props.options, function (option) {
            return <option key={option} value={option}>{titleCase(option)}</option>
          })}
        </select>
        <label htmlFor={this.props.id}>
          {this.props.label}
        </label>
      </div>
    );
  }

});
