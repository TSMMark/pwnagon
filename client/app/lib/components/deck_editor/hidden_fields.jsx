import ReactOnRails from "react-on-rails"
import React from "react"
import _ from "lodash"

var offScreenStyle = {
  position: "fixed",
  marginLeft: "-99999999px"
}

var DeckEditorHiddenFields = React.createClass({

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

module.exports = DeckEditorHiddenFields;
