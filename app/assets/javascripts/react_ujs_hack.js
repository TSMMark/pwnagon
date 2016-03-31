var React = require("react");
var ReactDOM = require("react-dom");
var $ = require("jquery");

$(function () {
  $("[data-react-class]").each(function () {
    var $el = $(this);
    var componentRef = $el.data("react-class");
    var props = $el.data("react-props");
    var constructor = window[componentRef] || eval.call(window, componentRef);
    ReactDOM.render(React.createElement(constructor, props), this);
  });
});
