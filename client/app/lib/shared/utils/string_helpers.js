var StringHelpers = {};

StringHelpers.titleCase = function (string) {
  var rg = /(^|\s)([a-z])/gi;
  string = string.replace(/[_-]/g, " ");
  return string.replace(rg, function(toReplace) {
    return toReplace.toUpperCase();
  });
};

module.exports = StringHelpers;
