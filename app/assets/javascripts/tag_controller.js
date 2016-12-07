var TAG = TAG || {}

TAG.Controller = (function(Model, View) {
  var gameInterval;

  var init = function() {
    TAG.View.init();
    TAG.Model.init();
    render();
    update_highScore();
  }

  var isGameOver = function() {
    if (TAG.Model.getCharList().length === 0) {
      var score = Math.floor(($.now() - TAG.Model.gameStartTime())/1000);
      console.log("GameOver");
      clearInterval(gameInterval);
      console.log("clearing game interval "+gameInterval);
      name=prompt("Please enter your name");
      createScore(name, score);
      TAG.View.gameOverAction();
      TAG.View.newGameListener();
    }

  }

  var newGame = function() {
    clearInterval(gameInterval);
    console.log("clearing game interval "+gameInterval);
    gameInterval = setInterval(function(){
      isGameOver();
      TAG.View.tic();
    }, 1000);
    console.log("creating game interval "+gameInterval);
    deleteAllTags();
  }

  var render = function() {
    $.ajax({
      url: "/tags",
      type: "GET",
      dataType : "json",
      success: function(tags) {
        TAG.View.renderTags(tags);
      },

      error: function( xhr, status, errorThrown ) {
        console.log( "Error: " + errorThrown );
        console.log( "Status: " + status );
      },

      complete: function( xhr, status ) {
        console.log( "render tags request is complete!" );
      }
    });
  }

  var persistTag = function(posX, posY, name) {
    var postData = $(this).serializeArray();
    postData = ({xCoordinate: posX, yCoordinate: posY, name: name});
    postData = JSON.stringify(postData);
    $.ajax( {
      url: "/tags",
      data: postData,
      type: "POST",
      contentType: "application/json",
      dataType: "json",

      success: function(tag) {
        console.log("New Tag Created");
        TAG.Model.removeCharFromList(tag.name);
        // TAG.Model.tags().push(new TAG.TagModule.Tag(tag.id, tag.xCoordinate, tag.yCoordinate, tag.name));
        TAG.View.addIdToLastTag(tag.id);
      },

      error: function( xhr, status, errorThrown ) {
        console.log( "Error: " + xhr.responseText );
        console.log( "Status: " + status );
        removeLastTag();
      },

      complete: function( xhr, status ) {
        console.log( "persistTag request is complete!" );
      }
    });
  }

  var deleteTag = function(tagParams) {
    console.log(tagParams);
    $.ajax({
      url: '/tags/' + tagParams.id + '.json',
      type: "DELETE",
      contentType: "application/json",
      dataType: "json",

      success: function(tag) {
        console.log("tag deleted :"+ tag);
        $("[data-id='" + tag.id + "']").remove();
        TAG.Model.addCharToList(tag.name);
      },

      error: function( xhr, status, errorThrown ) {
          console.log( "Error: " + errorThrown );
          console.log( "Status: " + status );
      },

      complete: function( xhr, status ) {
          console.log( "deleteTag request is complete!" );
      }
    });
  }

  var deleteAllTags = function() {
    $.ajax({
      url: '/tags/destroy_all',
      type: "DELETE",
      contentType: "application/json",
      dataType: "json",

      success: function(tags) {
        console.log('deleted tags'+ tags);
        TAG.View.clearAllTags();
        TAG.Model.initCharList();
        TAG.View.gameOverAction();
      },

      error: function( xhr, status, errorThrown ) {
          console.log( "Error: " + errorThrown );
          console.log( "Status: " + status );
      },

      complete: function( xhr, status ) {
          console.log( "deleteAllTags request is complete!" );
          init();
      }
    });
  }

  var update_highScore = function() {
    $.ajax({
      url: "/scores",
      type: "GET",
      dataType : "json",
      success: function(scores) {
        TAG.View.renderScores(scores);
      },

      error: function( xhr, status, errorThrown ) {
        console.log( "Error: " + errorThrown );
        console.log( "Status: " + status );
      },

      complete: function( xhr, status ) {
        console.log( "The request is complete!" );
      }
    });
  }

  var createScore = function(name, score) {
    var postData = $(this).serializeArray();
    postData = ({name: name, high_score: score});
    postData = JSON.stringify(postData);
    $.ajax( {
      url: "/scores",
      data: postData,
      type: "POST",
      contentType: "application/json",
      dataType: "json",

      success: function(score) {
        console.log("New score Created");
        update_highScore();
      },

      error: function( xhr, status, errorThrown ) {
        console.log( "Error: " + xhr.responseText );
        console.log( "Status: " + status );
      },

      complete: function( xhr, status ) {
        console.log( "The request is complete!" );
      }
    });
  }
  var removeLastTag = function() {
    TAG.Model.removeLastTag();
    TAG.View.removeLastTag();
  }

  return {
    init: init,
    persistTag: persistTag,
    deleteTag: deleteTag,
    newGame: newGame,
  }
})(TAG.Model, TAG.View);