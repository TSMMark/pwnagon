import ReactOnRails from "react-on-rails"
import React from "react"
import classNames from "classnames"
import _ from "lodash"
import $ from "jquery"

var DeckBuildTreeActionNode = React.createClass({

  propTypes: {
    description: React.PropTypes.string.isRequired,
    purchases: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    child: React.PropTypes.object,

    // Callbacks
    onChooseContinue: React.PropTypes.func
  },

  handleChooseContinue: function () {
    if (!this.props.onChooseContinue) return;

    this.props.onChooseContinue(this.props.child);
  },

  renderPurchase: function (purchase, index) {
    var classes = classNames("action-purchase", {
      "action-purchase-primary": index === 0
    });

    // TODO: better key prop.
    return (
      <li className={classes} key={index}>
        <span className="action-purchase-cost">{purchase.card.cost}</span>
        <div className="action-purchase-inner valign-wrapper">
          <h1 className="action-purchase-name valign">{purchase.card.name}</h1>
        </div>
      </li>
    );
  },

  render: function () {
    return (
      <li className="deck-build-tree-node action">
        <h5 className="action-description">{this.props.description}</h5>

        <ol className="action-purchases">
          {_.map(this.props.purchases, this.renderPurchase)}
        </ol>

        {
          this.props.child ? (
            <a className="btn" href="javascript:void(0);" onClick={this.handleChooseContinue}>
              Continue
            </a>
          ) : null
        }
        <hr/>
      </li>
    );
  }

});

module.exports = DeckBuildTreeActionNode;
