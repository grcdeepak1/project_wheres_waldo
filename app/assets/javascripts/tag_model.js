var TAG = TAG || {}

TAG.Model = (function() {

  var _charList = ['Waldo', 'Wenda', 'Odlaw', 'Whizard Whitebeard', 'Woof'];
  var _tags     = [];
  var _gameStartTime = undefined;

  var addTag = function(tagObject) {
    _tags.push(tagObject);
  }

  var initCharList = function() {
    _charList = ['Waldo', 'Wenda', 'Odlaw', 'Whizard Whitebeard', 'Woof'];
  }

  var getCharList = function() {
    return _charList;
  }

  var removeCharFromList = function(character) {
    _charList.forEach( function(c, i) {
      if(c === character) {
        _charList.splice(i, 1);
      }
    })
  }

  var addCharToList = function(character) {
    _charList.push(character);
  }

  var tags = function() {
    return _tags;
  }

  var removeLastTag = function() {
    _tags.pop();
  }

  var setGameStartTime = function() {
    _gameStartTime = $.now();
  }

  var gameStartTime = function() {
    return _gameStartTime;
  }

  var init = function() {
    setGameStartTime();
  }

  return {
    init: init,
    getCharList: getCharList,
    tags: tags,
    removeLastTag: removeLastTag,
    gameStartTime: gameStartTime,
    removeCharFromList: removeCharFromList,
    addCharToList: addCharToList,
    initCharList: initCharList,
  }
})();