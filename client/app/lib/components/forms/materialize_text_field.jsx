import ReactOnRails from "react-on-rails"
import React from "react"
import classNames from "classnames"
import _ from "lodash"
import $ from "jquery"

var TEXT_INPUT_PROP_KEYS = ["value", "defaultValue", "name", "id", "autoFocus"];

var MaterializeTextField = React.createClass({

  propTypes: {
    // Input
    value: React.PropTypes.string,
    defaultValue: React.PropTypes.string,
    name: React.PropTypes.string,
    id: React.PropTypes.string,
    autoFocus: React.PropTypes.bool,

    // Label
    label: React.PropTypes.string,

    // Wrapper
    className: React.PropTypes.string,

    // Callbacks
    onChange: React.PropTypes.func,
    onKeyPress: React.PropTypes.func
  },

  componentDidMount: function() {
    if (this.props.autoFocus) {
      setTimeout(function () {
        $(this.refs.input).focus();
      }.bind(this), 0);
    }
  },

  handleChange: function (event) {
    if (!this.props.onChange) return;
    return this.props.onChange(event.target.value, event);
  },

  render: function () {
    var textInputProps = _.pick(this.props, TEXT_INPUT_PROP_KEYS);
    var classes = classNames("input-field", this.props.className);

    return (
      <div className={classes}>
        <input ref="input" type="text"
          {...textInputProps}
          onChange={this.handleChange}
          onKeyPress={this.props.onKeyPress} />
        <label htmlFor={this.props.id}>
          {this.props.label}
        </label>
      </div>
    );
  }

});

module.exports = MaterializeTextField;
