Components.DeckBuildTree.ActionNode = React.createClass({

  propTypes: {
    purchases: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    child: React.PropTypes.object,

    // Callbacks
    onChooseContinue: React.PropTypes.func
  },

  handleChooseContinue: function () {
    if (!this.props.onChooseContinue) return;

    this.props.onChooseContinue(this.props.child);
  },

  render: function () {
    return (
      <li className="deck-build-tree-node action">
        <p>I'm an action!</p>
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
