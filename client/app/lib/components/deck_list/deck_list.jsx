import ReactOnRails from "react-on-rails"
import React from "react"
import CSSTransitionGroup from "react/lib/ReactCSSTransitionGroup"
import _ from "lodash"
import $ from "jquery"

import MaterializeTextField from "../forms/materialize_text_field"
import DeckListCard from "./deck_list_card"

import { getCardById } from "../../shared/utils/cards"
import ParagonConstants from "../../shared/paragon_constants"

var CANCEL_WARNING = "You changes will not be saved. Are you sure?";

// TODO: If any cards are "selected" but not present in `cards`, this breaks.
var applyCounts = function (cards) {
  return _.reduce(cards, function (cards, card) {
    var alreadyPresentCard = getCardById(cards, card.id);
    if (alreadyPresentCard) {
      alreadyPresentCard.count += 1;
    }
    else {
      card.count = 1;
      cards.push(card);
    }
    return cards;
  }, []);
}

var wrapWithTransitionGroup = function (children) {
  return (
    <CSSTransitionGroup
      transitionName="deck-list-cards"
      transitionEnterTimeout={200}
      transitionLeaveTimeout={1}>
      {children}
    </CSSTransitionGroup>
  );
}

var cardSlotsUsed = function (cards) {
  return _.reduce(cards, function (count, card) {
    return count + card.count;
  }, 0);
}

var DeckList = React.createClass({

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

    // Configurations
    noEdit: React.PropTypes.bool,

    // Routing
    cancelURL: React.PropTypes.string,

    // State
    selectedCardId: React.PropTypes.number,

    // Callbacks
    onClickCard: React.PropTypes.func,
    onClickDecrementCard: React.PropTypes.func,
    onClickIncrementCard: React.PropTypes.func,

    // Not currently used.
    onChangeName: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      noEdit: false
    };
  },

  componentWillReceiveProps: function(nextProps) {
    this._cardsWithCounts = undefined;
  },

  handleClickCard: function (card) {
    if (!this.props.onClickCard) return;
    this.props.onClickCard(card);
  },

  handleClickDecrementCard: function (card) {
    if (!this.props.onClickDecrementCard) return;
    this.props.onClickDecrementCard(card);
  },

  handleClickIncrementCard: function (card) {
    if (!this.props.onClickIncrementCard) return;
    this.props.onClickIncrementCard(card);
  },

  handleChangeName: function (value, _event) {
    if (!this.props.onChangeName) return;
    this.props.onChangeName(value);
  },

  cardsGroupedByType: function () {
    return _.groupBy(_.orderBy(this.cardsWithCounts(), ["cost", "name"]), "type");
  },

  cardSlotsUsed: function () {
    return cardSlotsUsed(this.cardsWithCounts());
  },

  cardsWithCounts: function () {
    return this._cardsWithCounts || (this._cardsWithCounts = applyCounts(this.props.cards));
  },

  renderNameField: function () {
    return (
      <MaterializeTextField
        name="deck[name]"
        id="deck_name"
        value={this.props.name}
        label="Name your deck"
        onChange={this.handleChangeName}
        autoFocus={_.isEmpty(this.props.name)} />
    );
  },

  renderTopMessage: function () {
    if (this.props.noEdit) {
      if (this.cardSlotsUsed() < ParagonConstants.DECK_MAX_CARDS) {
        return (
          <h6 className="deck-list-cards-count-header red-text text-darken-1">
            Incomplete deck: {this.cardSlotsUsed()} / {ParagonConstants.DECK_MAX_CARDS}
          </h6>
        );
      }
    }
    else {
      return (
        <h6 className="deck-list-cards-count-header">
          Card slots used: {this.cardSlotsUsed()} / {ParagonConstants.DECK_MAX_CARDS}
        </h6>
      );
    }
  },

  renderCard: function (card, _index) {
    return (
      <li key={card.id} className="deck-list-cards-list-item">
        <DeckListCard {...card}
          noEdit={this.props.noEdit}
          onClick={this.handleClickCard.bind(this, card)}
          onClickDecrement={this.handleClickDecrementCard.bind(this, card)}
          onClickIncrement={this.handleClickIncrementCard.bind(this, card)}
          isSelected={card.id === this.props.selectedCardId} />
      </li>
    );
  },

  render: function () {
    var cardsGroupedByType = this.cardsGroupedByType();

    // TODO: Conditionally make name field editable.
    return (
      <div className="deck-list">
        {this.renderTopMessage()}

        <ul className="deck-list-card-types-list">
          <li className="deck-list-card-types-item">
            <h6 className="card-type-header">
              <span className="card-type-label">PrimeHelix</span>
              {this.props.noEdit ? null : (
                <span className="card-type-count">
                  {cardSlotsUsed(cardsGroupedByType.PrimeHelix)} / 1
                </span>
              )}
            </h6>
            <ul className="deck-list-cards-list">
              {wrapWithTransitionGroup(
                _.map(cardsGroupedByType.PrimeHelix, this.renderCard)
              )}
              {_.isEmpty(cardsGroupedByType.PrimeHelix) ? (
                <li className="empty-message">No PrimeHelix added yet</li>
              ) : null }
            </ul>
          </li>
          <li className="deck-list-card-types-item">
            <h6 className="card-type-header">
              <span className="card-type-label">Equipments</span>
              <span className="card-type-count">
                {cardSlotsUsed(cardsGroupedByType.Equipment)}
              </span>
            </h6>
            <ul className="deck-list-cards-list">
              {wrapWithTransitionGroup(
                _.map(cardsGroupedByType.Equipment, this.renderCard)
              )}
              {_.isEmpty(cardsGroupedByType.Equipment) ? (
                <li className="empty-message">No Equipments added yet</li>
              ) : null }
            </ul>
          </li>
          <li className="deck-list-card-types-item">
            <h6 className="card-type-header">
              <span className="card-type-label">Upgrades</span>
              <span className="card-type-count">
                {cardSlotsUsed(cardsGroupedByType.Upgrade)}
              </span>
            </h6>
            <ul className="deck-list-cards-list">
              {wrapWithTransitionGroup(
                _.map(cardsGroupedByType.Upgrade, this.renderCard)
              )}
              {_.isEmpty(cardsGroupedByType.Upgrade) ? (
                <li className="empty-message">No Upgrades added yet</li>
              ) : null }
            </ul>
          </li>
        </ul>
        <ul className="deck-list-actions">
          {this.props.noEdit ? null : (
            <li><input type="submit" value="Save" className="btn" /></li>
          )}
          {this.props.noEdit ? null : (
            <li><a href={this.props.cancelURL} className="btn-flat" data-confirm={CANCEL_WARNING}>Cancel</a></li>
          )}
        </ul>
      </div>
    );
  }

});

module.exports = DeckList;
