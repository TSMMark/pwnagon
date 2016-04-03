var React = require("react");
var CSSTransitionGroup = require("react-addons-css-transition-group");
var overlayTransitionDurations = TransitionDurations("overlay");

Components.Overlay.OverlaySeries = React.createClass({
  displayName: "OverlaySeries",

  propTypes: {
    // children: 0 or 1 `ReactElement`s.
    //   Uses the key prop of children to decide if next or prev slide.

    onClickAway: React.PropTypes.func
  },

  getDefaultProps: function () {
    return {};
  },

  componentWillUpdate: function (nextProps) {
    nextProps || (nextProps = {});

    this.updateSlideFromDirection(nextProps);
  },

  updateSlideFromDirection: function (nextProps) {
    var prevChild = this.props.children;
    var nextChild = nextProps.children;
    var prevChildKey = prevChild ? parseInt(prevChild.key) : null;
    var nextChildKey = nextChild ? parseInt(nextChild.key) : null;

    if (nextChildKey === null) {
      this._steppingBackwards = prevChildKey === 0;
    }
    else {
      this._steppingBackwards = nextChildKey < prevChildKey;
    }
  },

  getSlideFromDirection: function () {
    return this._steppingBackwards ? "left" : "right";
  },

  wrapComponentWithTransitionGroup: function (children) {
    var transitionName = "overlay-series-from-" + this.getSlideFromDirection();

    return (
      <CSSTransitionGroup
        className="transition-group"
        transitionName={transitionName}
        {...overlayTransitionDurations}>
        {children}
      </CSSTransitionGroup>
    );
  },

  renderOverlay: function () {
    var childKey = this.props.children.key;
    return (
      <Components.Overlay.Overlay key={"TODO: get a key here"}
        onClickAway={this.props.onClickAway}
        wrapContentWith={this.wrapComponentWithTransitionGroup}
        contentKey={childKey}>
        {this.props.children}
      </Components.Overlay.Overlay>
    );
  },

  render: function () {
    return (
      <CSSTransitionGroup
        transitionName={"overlay-from-" + this.getSlideFromDirection()}
        {...overlayTransitionDurations}>
        {
          this.props.children
            ? this.renderOverlay()
            : null
        }
      </CSSTransitionGroup>
    );
  }

});
