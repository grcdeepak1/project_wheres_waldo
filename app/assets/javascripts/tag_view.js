var TAG = TAG || {}

TAG.View = (function() {
  var TAG_BOX_SIZE = 50;
  var TAG_OFFSET = TAG_BOX_SIZE/2;

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
    tagBox.css({top: posY - TAG_OFFSET , left: posX - TAG_OFFSET, position:'absolute'});
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
      var posX = $(this.parentElement.parentElement).position().left + TAG_OFFSET;
      var posY = $(this.parentElement.parentElement).position().top + TAG_OFFSET;
      var name = $(this).html();

      var deleteLink = $('<a href="#" class="delete-link">delete</a>').hide();
      $(this.parentElement).append(deleteLink);
      TAG.Controller.persistTag(posX, posY, name);
    })
  }



  var renderTags = function(tags) {
    tags.forEach( function(tag, index, tags_array) {
      _renderTag(tag.id, tag.xCoordinate, tag.yCoordinate, tag.name);
      // TAG.Model.tags().push(new TAG.TagModule.Tag(tag.id, tag.xCoordinate, tag.yCoordinate, tag.name));
    })
  }

  var _renderTag = function(id, posX, posY, name) {
    var tagBox = $('<div class="tag-box"></div>').hide();
    tagBox.attr('data-id', id);
    tagBox.css({top: posY - TAG_OFFSET , left: posX - TAG_OFFSET, position:'absolute'});
    $('#img-container').append(tagBox);
    var charList = $('<ul class="dropdown"></ul>');
    charList.append($('<li>'+name+'</li>'))
    tagBox.append(charList);
    var deleteLink = $('<a class="delete-link">delete</a>').hide();
    charList.append(deleteLink);
  }

  var tag = function(posX, posY) {
    _displayTagBox(posX, posY);
  }

  var removeLastTag = function() {
    $('.tag-box').last().remove()
  }

  var _tagHoverListener = function() {
    $('#img-container').on({
      mouseenter: function () {
        $(this).find('.delete-link').show();
      },
      mouseleave: function () {
        $(this).find('.delete-link').hide();
      }
    }, '.tag-box' );
  }

  var _imgHoverListener = function() {
    $('#img-container').on({
      mouseenter: function () {
        $('.tag-box').show();
      },
      mouseleave: function () {
        $('.tag-box').hide();
      }
    });
  }

  var _deleteTagListener = function() {
    $('#img-container').on("click", '.delete-link', function(e) {
      e.preventDefault();
      TAG.Controller.deleteTag(tagParams($(this.parentElement.parentElement)));
    });
  }

  var tagParams = function(tagBox) {
    var pos = $(tagBox).position();
    return {
       id: Number($(tagBox).attr('data-id')),
       x: Math.floor(pos.left) + TAG_OFFSET,
       y: Math.floor(pos.top) + TAG_OFFSET,
       name: $(tagBox).find('li:visible').html()
    }
  }

  var addIdToLastTag = function(id) {
    $('.tag-box').last().attr('data-id', id);
  }

  var tic = function() {
    $('#time-counter').html(parseInt($('#time-counter').html()) + 1);
  }

  var clearAllTags = function() {
    $.each($('.tag-box'), function(index, tagBox) {
      TAG.Controller.deleteTag(tagParams(tagBox));
    })
  }

  var _newGameListener = function() {
    $('#new-game').on("click", function(e) {
      e.preventDefault();
      TAG.Controller.newGame();
    });
  }

  var init = function() {
    $('#time-counter').html(0);
    _imgClickListener();
    _charTagListener();
    _imgHoverListener();
    _tagHoverListener();
    _deleteTagListener();
    _newGameListener();
  }
  return {
    init: init,
    tic: tic,
    renderTags: renderTags,
    removeLastTag: removeLastTag,
    addIdToLastTag: addIdToLastTag,
    clearAllTags: clearAllTags,
  }
})();