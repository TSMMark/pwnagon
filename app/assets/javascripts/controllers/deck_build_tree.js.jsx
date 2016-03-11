Controllers.DeckBuildTree = React.createClass({

  propTypes: {
    firstNode: React.PropTypes.object
  },

  render: function() {
    return (
      <Components.DeckBuildTree.Node
        node={this.props.firstNode} />
    );
  }

});
