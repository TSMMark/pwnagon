// TODO: Make globally available.
var authToken = $("meta[name=\"csrf-token\"]").attr("content");

Components.Comments.CommentsList = React.createClass({

  propTypes: {
    deckId: React.PropTypes.number.isRequired,

    // TODO: shape
    comments: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
  },

  handleClickAuthor: function (event) {
    event.preventDefault();
    event.stopPropagation();
    alert("User profile pages coming soon!\nThank you for your patience (:");
  },

  renderComment: function (comment) {
    return (
      <li className="comment-list-item" key={comment.id}>
        <div className="card-panel">
          <div className="byline">
            {"posted by "}
            <address className="author truncate">
              <a href={"/users/" + comment.authorId} onClick={this.handleClickAuthor}>
                {comment.authorName}
              </a>
            </address>
            {" "}
            <small className="timestamp">
              {$.timeago(comment.createdAt)}
            </small>
          </div>
          <p className="body">{comment.body}</p>
        </div>
      </li>
    );
  },

  render: function () {
    return (
      <div className="comments-list-wrapper">
        <h1 className="white-text">Comments <small>(recent first)</small></h1>

        <ul className="comments-list">
          {_.map(this.props.comments, this.renderComment)}
        </ul>

        <form method="POST" action={"/decks/" + this.props.deckId + "/comments"}>
          <input type="hidden" name="authenticity_token" value={authToken} />
          <div className="card">
            <div className="card-content">
              <span className="card-title">Post a comment</span>
              <Components.Forms.MaterializeTextField
                defaultValue={""}
                name="comment[body]"
                label="Type your comment here" />
            </div>
            <div className="card-action">
              <button type="submit" className="btn">
                Post
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }

});
