Components.DeckBuildTree.ActionNode = React.createClass({

  propTypes: {
    purchases: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,

    // Callbacks
    onChooseContinue: React.PropTypes.func
  },

  handleChooseContinue: function () {
    console.log("Continue!");
    if (!this.props.onChooseContinue) return;

    this.props.onChooseContinue();
  },

  render: function () {
    return (
      <li className="deck-build-tree-node action">
        <p>I'm an action!</p>
        <a href="javascript:void(0);" onClick={this.handleChooseContinue}>
          Continue
        </a>
      </li>
    );
  }

});
