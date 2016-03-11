Components.DeckBuildTree.Node = React.createClass({

  propTypes: {
    node: React.PropTypes.object
  },

  render: function() {
    return (
      <div>{this.props.node.toString()}</div>
    );
  }

});
