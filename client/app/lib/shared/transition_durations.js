// - -------------------------------------------------------------------- - //
// TODO: update comment.
// These values correspond with React Timeout Transition Group Times in variables.less
// - -------------------------------------------------------------------- - //

var transitionDurations = {

  "overlay": {
    "transitionEnterTimeout": 400,
    "transitionLeaveTimeout": 120
  }

};

var TransitionDurations = function (name) {
  var durations = transitionDurations[name];
  if (durations) {
    return durations;
  }
  else {
    throw new Error("Invalid transition name: \"" + name + "\".");
  }
};

module.exports = TransitionDurations;
