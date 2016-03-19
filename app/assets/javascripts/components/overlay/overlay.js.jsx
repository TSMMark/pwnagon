var verticallyCenter = function () {
  if (!this.isMounted()) return;

  var $content = $(this.refs["content"])
    , $inner = $(this.refs["inner"])
    , contentHeight = $content.innerHeight()
    , innerHeight = $inner.outerHeight(true)
    , top = (contentHeight / 2) - (innerHeight / 2);

  top = Math.max(top, 0);

  $inner.css("top", top);
}

Components.Overlay.Overlay = React.createClass({

  propTypes: {
    className: React.PropTypes.string,
    alpha: React.PropTypes.number,
    onClickAway: React.PropTypes.func,
    wrapContentWith: React.PropTypes.any,
    contentKey: React.PropTypes.any
  },

  getDefaultProps: function () {
    return {
      alpha: 0.7
    }
  },

  componentDidMount: function () {
    var self = this;
    this.verticallyCenter();

    $(window).on("resize", this._throttledVerticallyCenter);

    this.$mediaElements().each(function() {
      this.addEventListener("loadedmetadata", self._throttledVerticallyCenter);
    });

    this.$loadableElements().on("load", this._throttledVerticallyCenter);
  },

  componentDidUpdate: function () {
    this.verticallyCenter();
  },

  componentWillUnmount: function () {
    var self = this;

    $(window).off("resize", this._throttledVerticallyCenter);

    this.$mediaElements().each(function() {
      this.removeEventListener("loadedmetadata", self._throttledVerticallyCenter);
    });

    this.$loadableElements().off("load", this._throttledVerticallyCenter);
  },

  $mediaElements: function () {
    return $(this).find("video, audio");
  },

  $loadableElements: function () {
    return $(this).find("img");
  },

  verticallyCenter: verticallyCenter,

  _throttledVerticallyCenter: _.throttle(verticallyCenter, 400),

  handleClickAway: function (event) {
    if (!this.props.onClickAway) {
      return;
    }

    var clickAwayNodes = [
          this.refs["content"],
          this.refs["inner"]
        ];

    if (!_.includes(clickAwayNodes, event.target)) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    this.props.onClickAway(event);
  },

  renderContent: function () {
    return (
      <div className="overlay-content" ref="content" key={this.props.contentKey}>
        <div className="overlay-inner" ref="inner">
          {this.props.children}
        </div>
      </div>
    );
  },

  render: function () {
    var alpha = this.props.alpha
      , wrapContentWith = this.props.wrapContentWith
      , style = {
          background: "rgba(0, 0, 0, " + alpha + ")"
        }
      , classes = {
          "overlay-container": true
        };

    classes[classNames(this.props.className)] = true;

    return (
      <div className={classNames(classes)} style={style} ref="container"
           onClick={this.handleClickAway}>
        {
          wrapContentWith
            ? wrapContentWith(this.renderContent())
            : this.renderContent()
        }
      </div>
    );
  }

});
