import ReactOnRails from "react-on-rails"
import React from "react"
import _ from "lodash"
import $ from "jquery"

import CardPickerCard from "./card"
import StickScroll from "../stick_scroll"
import MaterializeTextField from "../forms/materialize_text_field"
import MaterializeSelectField from "../forms/materialize_select_field"

var CARD_TYPE_ORDER_MAP = {
  "PrimeHelix": 0,
  "Equipment": 1,
  "Upgrade": 2
}

var SEARCH_TYPE_OPTIONS = _.keys(CARD_TYPE_ORDER_MAP);

var getStatsKeysForCard = function (card) {
  return _.keys(card.effects).concat(_.keys(card.fullyUpgradedEffects));
}

// A card matches if it includes the series of characters in order,
// even if there are other characters in between.
// i.e. searchTerm "wcb" matches string "Windcarver Blade".
var stringMatchesTerm = function (string, searchTerm) {
  if (!searchTerm) return true;
  searchTerm = _.map(searchTerm.split(""), function (slice) {
    return _.escapeRegExp(slice);
  }).join(".*");
  var searchTermRegExp = new RegExp(searchTerm, "i");
  return !!string.match(searchTermRegExp);
}

var getStatsOptions = function (cards) {
  return _.sortBy(_.uniq(_.flatten(_.map(cards, getStatsKeysForCard))));
}

var CardPicker = React.createClass({

  propTypes: {
    cards: React.PropTypes.arrayOf(React.PropTypes.shape({
      id: React.PropTypes.number,
      name: React.PropTypes.string.isRequired,
      cost: React.PropTypes.number.isRequired,
      type: React.PropTypes.string.isRequired,
      trigger: React.PropTypes.string,
      affinity: React.PropTypes.string,
      rarity: React.PropTypes.string,
      effects: React.PropTypes.object.isRequired,
      fullyUpgradedEffects: React.PropTypes.object.isRequired,
      imageUrl: React.PropTypes.string.isRequired
    })).isRequired,

    // Callbacks
    onSelectCard: React.PropTypes.func
  },

  getInitialState: function () {
    return {
      isAdvancedSearch: false,
      searchTermName: "",
      searchTermType: "",
      searchTermStat: [],

      searchTypeOptions: SEARCH_TYPE_OPTIONS,
      searchStatOptions: getStatsOptions(this.props.cards) // This is antipattern, but since this is controller it's fine for now.
    };
  },

  handleClickCard: function (card, _event) {
    if (!this.props.onSelectCard) return;

    this.props.onSelectCard(card);
  },

  handleChangeSearchTerm: function (key, value) {
    var newState = {};
    newState[key] = value
    this.setState(newState);
  },

  handleKeyPressSearch: function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      var firstMatchingCard = _.first(this.filteredCards());
      if (firstMatchingCard) {
        this.handleClickCard(firstMatchingCard);
      }
    }
  },

  handleClickToggleAdvanedSearch: function (event) {
    event.preventDefault();
    this.setState({ isAdvancedSearch: !this.state.isAdvancedSearch });
  },

  filteredCards: function () {
    var filteredCards = _.filter(this.props.cards, function (card) {
      if (!stringMatchesTerm(card.name, this.state.searchTermName)) return false;

      if (this.state.searchTermType && this.state.searchTermType != card.type) return false;

      if (!_.isEmpty(this.state.searchTermStat)) {
        var statsKeys = getStatsKeysForCard(card);
        var matchingStats = _.intersection(statsKeys, this.state.searchTermStat);
        if (matchingStats.length !== this.state.searchTermStat.length) return false;
      }

      return true;
    }.bind(this));

    filteredCards = _.clone(filteredCards);

    _.each(filteredCards, function (card) {
      // Used for ordering by category.
      card.typeIndex = CARD_TYPE_ORDER_MAP[card.type];
    });

    filteredCards = _.orderBy(filteredCards,
      ["typeIndex", "cost", "name"],
      ["asc", "asc", "asc"]);

    return filteredCards;
  },

  renderCard: function (card, _index) {
    return (
      <li key={card.id} className="card-picker-cards-list-item">
        <CardPickerCard
          onClick={this.handleClickCard.bind(this, card)}
          {...card} />
      </li>
    );
  },

  render: function () {
    // TODO: This can be optimized by performing once in controller on change.
    var filteredCards = this.filteredCards();

    return (
      <div className="card-picker">
        <StickScroll
          stuckPadding={20}
          stuckOverflow="visible">
          <div className="row">
            <div className="col s12">
              <a className="btn btn-floating waves-effect waves-light toggle-advanced-search"
                onClick={this.handleClickToggleAdvanedSearch}>
                <i className="material-icons">arrow_drop_down</i>
              </a>
              <MaterializeTextField
                id="cards_search_name"
                value={this.state.searchTermName}
                label="Search cards by name"
                onChange={this.handleChangeSearchTerm.bind(this, "searchTermName")}
                onKeyPress={this.handleKeyPressSearch}
                className="card-header-input-field" />
            </div>
          </div>
          {this.state.isAdvancedSearch ? (
            <div className="row">
              <div className="col s12">
                <MaterializeSelectField
                  id="cards_search_type"
                  blank="Choose type"
                  options={this.state.searchTypeOptions}
                  label="Filter by type"
                  onChange={this.handleChangeSearchTerm.bind(this, "searchTermType")}
                  className="card-header-input-field" />
              </div>
            </div>
          ) : null}
          {this.state.isAdvancedSearch ? (
            <div className="row">
              <div className="col s12">
                <MaterializeSelectField
                  id="cards_search_stat"
                  blank="Choose stats"
                  options={this.state.searchStatOptions}
                  multiple={true}
                  label="Filter by stats"
                  onChange={this.handleChangeSearchTerm.bind(this, "searchTermStat")}
                  className="card-header-input-field" />
              </div>
            </div>
          ) : null}
        </StickScroll>

          {filteredCards.length > 0 ? (
            <ul className="card-picker-cards-list">
              {_.map(filteredCards, this.renderCard)}
            </ul>
          ) : (
            <div>
              <h5>No results...</h5>
              <p>Please keep in mind we are in very early Alpha and we may be missing a few cards.</p>
            </div>
          )}
      </div>
    );
  }

});

module.exports = CardPicker;
