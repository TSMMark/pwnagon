import ReactOnRails from "react-on-rails"
import React from "react"
import _ from "lodash"

import HiddenFields from "../components/deck_editor/hidden_fields"
import StickScroll from "../components/stick_scroll"
import DeckList from "../components/deck_list/deck_list"
import CardPicker from "../components/card_picker/card_picker"

import { getCardById } from "../shared/utils/cards"
import ParagonConstants from "../shared/paragon_constants"

// Remove the first occurrence of `item` from `list`.
var decrementListItem = function (list, item) {
  var alreadyRemovedOnce = false;

  return _.reduce(list, function (newList, listItem) {
    if (alreadyRemovedOnce || listItem !== item) {
      newList.push(listItem);
    } else {
      alreadyRemovedOnce = true;
    }

    return newList;
  }, []);
}

var DeckEditor = React.createClass({

  propTypes: {
    name: React.PropTypes.string,
    cards: React.PropTypes.arrayOf(React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      name: React.PropTypes.string.isRequired,
      cost: React.PropTypes.number.isRequired,
      type: React.PropTypes.string.isRequired,
      trigger: React.PropTypes.string,
      affinity: React.PropTypes.string.isRequired,
      rarity: React.PropTypes.string.isRequired,
      effects: React.PropTypes.object.isRequired,
      fullyUpgradedEffects: React.PropTypes.object.isRequired,
      imageUrl: React.PropTypes.string.isRequired
    })).isRequired,
    selectedCardsIds: React.PropTypes.arrayOf(React.PropTypes.number),

    // Routing
    cancelURL: React.PropTypes.string
  },

  getInitialState: function () {
    return {
      name: this.props && this.props.name || "",
      cards: this.props && this.props.cards || [],
      selectedCardsIds: this.props && this.props.selectedCardsIds || [],
      selectedDeckListCardId: null,
      cancelURL: this.props && this.props.cancelURL,
    };
  },

  handleSelectCardPickerCard: function (card) {
    var selectedCardsIds = _.concat(this.state.selectedCardsIds, card.id);
    if (selectedCardsIds.length > ParagonConstants.DECK_MAX_CARDS) {
      Materialize.toast("Your deck is full.", 4000);
    }
    else {
      this.setState({
        selectedCardsIds: selectedCardsIds
      });
    }
  },

  handleClickDecrementDeckListCard: function (card) {
    var selectedCardsIds = decrementListItem(this.state.selectedCardsIds, card.id);

    this.setState({
      selectedCardsIds: selectedCardsIds
    });
  },

  handleClickIncrementDeckListCard: function (card) {
    var selectedCardsIds = _.concat(this.state.selectedCardsIds, card.id);
    this.setState({
      selectedCardsIds: selectedCardsIds
    });
  },

  handleClickDeckListCard: function (card) {
    this.setState({
      selectedDeckListCardId: this.state.selectedDeckListCardId === card.id ? null : card.id
    });
  },

  handleChangeName: function (value) {
    this.setState({
      name: value
    });
  },

  cardsForDeckList: function () {
    var cards = _.map(this.state.selectedCardsIds, function (cardId) {
      var card = getCardById(this.state.cards, cardId);
      // TODO: card.moreAvailable = something;
      return card;
    }.bind(this));

    return cards;
  },

  render: function () {
    return (
      <div className="row">
        <HiddenFields
          selectedCardsIds={this.state.selectedCardsIds} />
        <div className="col s12 m5 l4">
          <StickScroll>
            <div className="card-panel">
              <DeckList
                name={this.state.name}
                cards={this.cardsForDeckList()}
                onChangeName={this.handleChangeName}
                onClickCard={this.handleClickDeckListCard}
                onClickDecrementCard={this.handleClickDecrementDeckListCard}
                onClickIncrementCard={this.handleClickIncrementDeckListCard}
                selectedCardId={this.state.selectedDeckListCardId}
                cancelURL={this.state.cancelURL} />
            </div>
          </StickScroll>
        </div>
        <div className="col s12 m7 l8">
          <div className="card-panel">
            <CardPicker
              cards={this.state.cards}
              onSelectCard={this.handleSelectCardPickerCard} />
          </div>
        </div>
      </div>
    );
  }

});

ReactOnRails.register({ "Controllers.DeckEditor": DeckEditor });
