var TAG = TAG || {}

TAG.View = (function() {
  var _imgClickListener = function() {
    var img = $('#waldo-img');
    img.on('click', function(e) {
    var posX = e.pageX - $(e.target.parentNode).position().left,
        posY = e.pageY - $(e.target.parentNode).position().top;
      console.log("clicked " + posX + ", " + posY);
      tag(posX, posY);
    });
  }

  var _displayTagBox = function(posX, posY) {
    var tagBox = $('<div class="tag-box"></div>');
    tagBox.css({top: posY - 25 , left: posX - 25, position:'absolute'});
    $('#img-container').append(tagBox);

    var charList = $('<ul class="dropdown"></ul>').hide();
    TAG.Model.getCharList().forEach( function(charName) {
      charList.append($('<li>'+charName+'</li>'))
    })
    tagBox.append(charList);
    charList.slideDown(500);
  }

  var _displayCharList = function(posX, posY) {
    var charList = $('<ul class="dropdown"></ul>');
    TAG.Model.getCharList().forEach( function(charName) {
      charList.append($('<li>'+charName+'</li>'))
    })
    charList.css({top: posY, left: posX, position:'absolute'});
    $('#img-container').append(charList);
  }

  var _charTagListener = function() {
    $('#img-container').on("click", 'ul.dropdown li', function() {
      $(this).siblings().slideToggle(500);
    })
  }

  var tag = function(posX, posY) {
    _displayTagBox(posX, posY);
  }

  var init = function() {
    _imgClickListener();
    _charTagListener();
  }
  return {
    init: init,
  }
})();