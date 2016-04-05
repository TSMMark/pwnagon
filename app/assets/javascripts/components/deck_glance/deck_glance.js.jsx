Components.DeckGlance.DeckGlance = React.createClass({

  propTypes: {
    id: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired,
    authorId: React.PropTypes.number.isRequired,
    authorName: React.PropTypes.string,
    description: React.PropTypes.string.isRequired,
    createdAt: React.PropTypes.instanceOf(Date).isRequired,
    updatedAt: React.PropTypes.instanceOf(Date).isRequired,
    heroId: React.PropTypes.number.isRequired,
    heroName: React.PropTypes.string.isRequired,
    heroAvatarUrl: React.PropTypes.string.isRequired,
    votesScore: React.PropTypes.number.isRequired,
    hotScore: React.PropTypes.number,
    commentsCount: React.PropTypes.number.isRequired,
    cardTypeValues: React.PropTypes.shape({
      offense: React.PropTypes.number,
      defense: React.PropTypes.number,
      utility: React.PropTypes.number
    })
  },

  // TODO: Should this bubble up instead?
  handleClick: function (event) {
    event.preventDefault();

    if (
      event.ctrlKey ||
      event.shiftKey ||
      event.metaKey || // apple
      (event.button && event.button == 1) // middle click, >IE9 + everyone else
    ) {
      // User wants to open in new window.
      window.open("/decks/" + this.props.id, "_blank");
    }
    else {
      window.location.href = "/decks/" + this.props.id;
    }
  },

  handleClickAuthor: function (event) {
    event.preventDefault();
    event.stopPropagation();
    alert("User profile pages coming soon!\nThank you for your patience (:")
  },

  render: function () {
    // TODO:
    //  - truncate description.
    //  - real eyes / chats data.
    //  - charts:
    //      <div className="deck-glance-charts">
    //        <div className="mana-curve-chart">
    //          I'm a <br/> chart
    //        </div>
    //        <div className="distribution-chart">
    //          I'm a <br/> chart
    //        </div>
    //      </div>
    //  - affinities:
    //      <div className="up-affinity">green</div>
    //      <div className="down-affinity">white</div>
    //

    return (
      <article className="deck-glance" onClick={this.handleClick}>
        <div className="deck-glance-avatar">
          <img src={this.props.heroAvatarUrl} />
        </div>
        <header className="deck-glance-header">
          <div className="deck-glance-header-stats">
            <div className="deck-glance-header-stats-content deck-stats">
              <div className="likes">
                {this.props.votesScore < 0 ? "" : "+"}
                {null && "TODO: dynamic icon"}
                {this.props.votesScore} <i className="material-icons small">trending_up</i>
              </div>
              {null && "TODO:" && <div className="views">152 eyes</div>}
              <div className="comments">
                {this.props.commentsCount} comments
              </div>
              <div className="hide">hot score: {this.props.hotScore}</div>
            </div>
          </div>
          <div className="deck-glance-header-info">
            <h3 className="title truncate">{this.props.name}</h3>
            <div className="byline">
              {"by "}
              <address className="author truncate">
                <a href={"/users/" + this.props.authorId} onClick={this.handleClickAuthor}>
                  {this.props.authorName || <span className="red-text text-darken-3">Guest user</span>}
                </a>
              </address>
              {" "}
              <span className="timestamp">
                updated {$.timeago(this.props.updatedAt)}
              </span>
            </div>
          </div>
        </header>
        <div className="deck-glance-content">
          <p>
            {this.props.description}
            {" "}
            <a href={"/decks/" + this.props.id}>Click to read more.</a>
          </p>
        </div>
        <footer className="deck-glance-footer">
          <div className="deck-glance-footer-stats">
            <div className="tags">
              <div className="tag chip">Tags</div>
              <div className="tag chip">Coming</div>
              <div className="tag chip">Soon</div>
            </div>
          </div>
          <div className="deck-glance-footer-hero-info">
            <h2 className="hero">{this.props.heroName}</h2>
          </div>
        </footer>
      </article>
    );
  }

});
