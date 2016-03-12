Components.DeckBuildTree.DecisionNode = React.createClass({

  propTypes: {
    question: React.PropTypes.string.isRequired,
    outcomes: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,

    // Callbacks
    onChooseOutcome: React.PropTypes.func
  },

  handleChooseOutcome: function (outcome) {
    if (!this.props.onChooseOutcome) return;

    this.props.onChooseOutcome(outcome);
  },

  renderOutcome: function (outcome, index) {
    return (
      <li
        key={index} // TODO: More robust key.
        className="outcome">
        <a className="btn" href="javascript:void(0);" onClick={this.handleChooseOutcome.bind(this, outcome)}>
          {outcome.answer}
        </a>
      </li>
    );
  },

  render: function () {
    return (
      <li className="deck-build-tree-node decision">
        <h4 className="decision-question">
          {this.props.question}
        </h4>
        <ul className="decision-outcomes">
          {_.map(this.props.outcomes, this.renderOutcome)}
        </ul>
        <hr/>
      </li>
    );
  }

});
