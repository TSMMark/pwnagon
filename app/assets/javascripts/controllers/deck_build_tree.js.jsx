Controllers.DeckBuildTree = React.createClass({

  propTypes: {
    nodes: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
  },

  getInitialState: function() {
    return {
      nodes: this.props.nodes
    };
  },

  handleChooseOutcome: function (outcome) {
    // TODO: add outcome to list of chose outcomes in state so we can hilight it.
    var nodes = this.state.nodes.concat(outcome.child);
    this.setState({
      nodes: nodes
    });
  },

  handleChooseContinue: function (child) {
    // TODO: add outcome to list of chose outcomes in state so we can hilight it.
    var nodes = this.state.nodes.concat(child);
    this.setState({
      nodes: nodes
    });
  },

  renderDecisionNode: function (node, index) {
    return (
      <Components.DeckBuildTree.DecisionNode
        key={index} // TODO: More robust key.
        tagName="li" // TODO: Make this work.
        question={node.question}
        outcomes={node.outcomes}
        onChooseOutcome={this.handleChooseOutcome} />
    );
  },

  renderActionNode: function (node, index) {
    return (
      <Components.DeckBuildTree.ActionNode
        key={index} // TODO: More robust key.
        tagName="li" // TODO: Make this work.
        purchases={node.purchases}
        child={node.child}
        onChooseContinue={this.handleChooseContinue} />
    );
  },

  renderNode: function (node, index) {
    switch(node.type) {
      case "decision":
        return this.renderDecisionNode(node, index);
      case "action":
        return this.renderActionNode(node, index);
      default:
        throw "Invalid node type: " + node.type
    };
  },

  render: function () {
    return (
      <ol className="deck-build-tree">
        {_.map(this.state.nodes, this.renderNode)}
      </ol>
    );
  }

});
