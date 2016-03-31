var React = require("react");
var offScreenStyle = {
  position: "fixed",
  marginLeft: "-99999999px"
}

Components.DeckEditor.HiddenFields = React.createClass({

  propTypes: {
    selectedCardsIds: React.PropTypes.arrayOf(React.PropTypes.number).isRequired
  },

  renderHiddenField: function (cardId, _index) {
    return <input key={_index} type="hidden" name="deck[card_ids][]" value={cardId} />
  },

  render: function () {
    return (
      <div style={offScreenStyle}>
        {_.map(this.props.selectedCardsIds, this.renderHiddenField)}
      </div>
    );
  }

});
