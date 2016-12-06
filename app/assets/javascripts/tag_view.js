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

      var deleteLink = $('<a href="#" class="delete-link">delete</a>').hide();
      $(this.parentElement).append(deleteLink);
      TAG.Controller.persistTag(posX, posY, name);
    })
  }



  var renderTags = function(tags) {
    tags.forEach( function(tag) {
      _renderTag(tag.id, tag.xCoordinate, tag.yCoordinate, tag.name);
    })
  }

  var _renderTag = function(id, posX, posY, name) {
    var tagBox = $('<div class="tag-box"></div>').hide();
    tagBox.attr('data-id', id);
    tagBox.css({top: posY - tagOffset , left: posX - tagOffset, position:'absolute'});
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
    $('#img-container').on("click", '.delete-link', function() {
      TAG.Controller.deleteTag(tagParams($(this.parentElement.parentElement)));
    });
  }

  var tagParams = function(tagBox) {
    var pos = $(tagBox).position();
    return {
       id: Number(tagBox.attr('data-id')),
       x: Math.floor(pos.left) + 25,
       y: Math.floor(pos.top) + 25,
       name: tagBox.find('li:visible').html()
    }
  }

  var addIdToLastTag = function(id) {
    $('.tag-box').last().attr('data-id', id);
  }

  var init = function() {
    _imgClickListener();
    _charTagListener();
    _imgHoverListener();
    _tagHoverListener();
    _deleteTagListener();
  }
  return {
    init: init,
    renderTags: renderTags,
    removeLastTag: removeLastTag,
    addIdToLastTag: addIdToLastTag,
  }
})();