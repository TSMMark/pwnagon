import React from "react"
import _ from "lodash"
import $ from "jquery"

var SPACE = "\u00a0";

var StickScroll = React.createClass({
  propTypes: {
    stuckOverflow: React.PropTypes.string.isRequired,
    stuckPadding: React.PropTypes.number.isRequired
  },

  getDefaultProps: function() {
    return {
      stuckPadding: 0,
      stuckOverflow: "auto"
    };
  },

  getInitialState: function() {
    return {
      scrolledBelowTop: false
    };
  },

  componentDidMount: function() {
    var $wrapper = $(this.refs.wrapper);
    var $window = $(window);
    var $inner = $(this.refs.inner);

    this._handleScroll = _.throttle(function () {
      var scrolledBelowTop = this.state.scrolledBelowTop;
      var scrollTop = $window.scrollTop();
      var offsetTop = $wrapper.offset().top;

      if (scrollTop > offsetTop) {
        var height = $inner.innerHeight();
        if (!scrolledBelowTop) {
          this.setState({
            scrolledBelowTop: true,
            width: $inner.innerWidth(),
            height: height
          });
        }
      }
      else {
        if (scrolledBelowTop) {
          this.setState({
            scrolledBelowTop: false
          });
        }
      }
    }.bind(this));

    $window.on("scroll", this._handleScroll);
  },

  componentWillUnmount: function() {
    $window.off("scroll", this._handleScroll);
  },

  innerStyle: function () {
    // TODO use js media queries.
    if (this.state.scrolledBelowTop) {
      return {
        position: "fixed",
        top: 0,
        width: (this.state.width + (this.props.stuckPadding * 2)) + "px",
        overflow: this.props.stuckOverflow,
        zIndex: 8000
      };
    }
    else {
      return {
        position: "relative"
      }
    }
  },

  render: function () {
    var wrapperStyle;

    if (this.state.scrolledBelowTop) {
      wrapperStyle = { height: this.state.height + "px" };
    }

    var classes = classNames("stick-scroll", {
      "stuck": this.state.scrolledBelowTop
    });

    return (
      <div className={classes} ref="wrapper" style={wrapperStyle}>
        <div className="inner" ref="inner" style={this.innerStyle()}>
          {this.props.children}
        </div>
        {this.state.scrolledBelowTop ? SPACE : null}
      </div>
    );
  }

});

module.exports = StickScroll;
