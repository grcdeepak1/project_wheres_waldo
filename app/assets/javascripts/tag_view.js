var TAG = TAG || {}

TAG.View = (function() {
  var tagBoxSize = 50;
  var tagOffset = tagBoxSize/2;

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
    tagBox.css({top: posY - tagOffset , left: posX - tagOffset, position:'absolute'});
    $('#img-container').append(tagBox);

    var charList = $('<ul class="dropdown untagged"></ul>').hide();
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
    $('#img-container').on("click", 'ul.dropdown.untagged li', function() {
      $(this).siblings().slideToggle(500);
      $(this.parentElement).removeClass('untagged');
      var posX = $(this.parentElement.parentElement).position().left + tagOffset;
      var posY = $(this.parentElement.parentElement).position().top + tagOffset;
      var name = $(this).html();
      TAG.Model.tags().push(new TAG.TagModule.Tag(posX, posY, name));
    })
  }

  var _mouseEnterListener = function() {
    $( "#img-container" ).mouseenter(function() {
      $('.tag-box').show();
    });
  }

  var _mouseLeaveListener = function() {
    $( "#img-container" ).mouseleave(function() {
      $('.tag-box').hide();
    });
  }

  var tag = function(posX, posY) {
    _displayTagBox(posX, posY);
  }


  var init = function() {
    _imgClickListener();
    _charTagListener();
    _mouseEnterListener();
    _mouseLeaveListener();
  }
  return {
    init: init,
  }
})();