import ReactOnRails from "react-on-rails"
import React from "react"
import _ from "lodash"
import $ from "jquery"

import MaterializeTextField from "../forms/materialize_text_field"

// TODO: Make globally available.
var authToken = $("meta[name=\"csrf-token\"]").attr("content");

var CommentsList = React.createClass({

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
            <address className="author truncate">
              <a href={"/users/" + comment.authorId} onClick={this.handleClickAuthor}>
                {comment.authorName}
              </a>
            </address>
            <small>
              {" - "}
              <span className="timestamp">
                {$.timeago(comment.createdAt)}
              </span>
            </small>
          </div>
          <p className="body">{comment.body}</p>
        </div>
      </li>
    );
  },

  render: function () {
    return (
      <div className="comments-list-wrapper" id="comments">
        <h3>Comments <small>(recent first)</small></h3>

        <ul className="comments-list">
          {_.map(this.props.comments, this.renderComment)}
        </ul>

        <form method="POST" action={"/decks/" + this.props.deckId + "/comments"}>
          <input type="hidden" name="authenticity_token" value={authToken} />
          <div className="card">
            <div className="card-content">
              <span className="card-title">Post a comment</span>
              <MaterializeTextField
                id="comment_body"
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

module.exports = CommentsList;
