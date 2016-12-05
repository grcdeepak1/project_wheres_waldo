var TAG = TAG || {}

TAG.Model = (function() {

  var _charList = ['Waldo', 'Wenda', 'Odlaw', 'Whizard Whitebeard', 'Woof'];
  var _tags     = [];

  var addTag = function(tagObject) {
    _tags.push(tagObject);
  }

  var getCharList = function() {
    return _charList;
  }
  var getTags = function() {
    return _tags;
  }
  return {
    getCharList: getCharList,
    getTags: getTags
  }
})();