var removeAllDescendantsOfNode = function (nodes, ancestorNode) {
  var indexOfAncestorNode = _.findIndex(nodes, function (node) {
    return node.id === ancestorNode.id;
  });

  return _.slice(nodes, 0, indexOfAncestorNode + 1);
}

Controllers.DeckBuildTree = React.createClass({

  propTypes: {
    nodes: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
  },

  getInitialState: function() {
    return {
      nodes: this.props.nodes
    };
  },

  handleChooseOutcome: function (parentNode, outcome) {
    // TODO: add outcome to list of chose outcomes in state so we can hilight it.
    var nodes = removeAllDescendantsOfNode(this.state.nodes, parentNode);
    nodes = _.concat(nodes, outcome.child);

    this.setState({
      nodes: nodes
    });
  },

  handleChooseContinue: function (parentNode, childNode) {
    // TODO: add outcome to list of chose outcomes in state so we can hilight it.
    var nodes = removeAllDescendantsOfNode(this.state.nodes, parentNode);
    nodes = _.concat(nodes, childNode);

    this.setState({
      nodes: nodes
    });
  },

  renderDecisionNode: function (node) {
    return (
      <Components.DeckBuildTree.DecisionNode
        key={node.id} // TODO: More robust key.
        tagName="li" // TODO: Make this work.
        question={node.question}
        outcomes={node.outcomes}
        onChooseOutcome={this.handleChooseOutcome.bind(this, node)} />
    );
  },

  renderActionNode: function (node) {
    return (
      <Components.DeckBuildTree.ActionNode
        key={node.id}
        tagName="li" // TODO: Make this work.
        description={node.description}
        purchases={node.purchases}
        child={node.child}
        onChooseContinue={this.handleChooseContinue.bind(this, node)} />
    );
  },

  renderNode: function (node) {
    switch(node.type) {
      case "decision":
        return this.renderDecisionNode(node);
      case "action":
        return this.renderActionNode(node);
      default:
        throw "Invalid node type: " + node.type
    };
  },

  render: function () {
    return (
      <ol className="deck-build-tree">
        <React.addons.CSSTransitionGroup
          transitionName="deck-build-tree-nodes"
          transitionEnterTimeout={100}
          transitionLeaveTimeout={100}>
          {_.map(this.state.nodes, this.renderNode)}
        </React.addons.CSSTransitionGroup>
      </ol>
    );
  }

});
