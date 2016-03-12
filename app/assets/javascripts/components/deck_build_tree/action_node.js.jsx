Components.DeckBuildTree.ActionNode = React.createClass({

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
    var classes = classNames("node-purchase", {
      "node-purchase-primary": index === 0
    });

    // TODO: better key prop.
    return (
      <li className={classes} key={index}>
        {purchase.card.name} ({purchase.card.cost})
      </li>
    );
  },

  render: function () {
    return (
      <li className="deck-build-tree-node action">
        <p>{this.props.description}</p>

        <ol className="node-purchases">
          {_.map(this.props.purchases, this.renderPurchase)}
        </ol>

        {
          this.props.child ? (
            <a href="javascript:void(0);" onClick={this.handleChooseContinue}>
              Continue
            </a>
          ) : null
        }
      </li>
    );
  }

});
