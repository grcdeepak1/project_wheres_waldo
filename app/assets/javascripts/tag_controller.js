var TAG = TAG || {}

TAG.Controller = (function(Model, View) {
  var init = function() {
    TAG.View.init();
    render();
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
        console.log( "The request is complete!" );
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
        TAG.Model.tags().push(new TAG.TagModule.Tag(tag.id, tag.xCoordinate, tag.yCoordinate, tag.name));
        TAG.View.addIdToLastTag(tag.id);
      },

      error: function( xhr, status, errorThrown ) {
        console.log( "Error: " + xhr.responseText );
        console.log( "Status: " + status );
        removeLastTag();
      },

      complete: function( xhr, status ) {
        console.log( "The request is complete!" );
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

  var removeLastTag = function() {
    TAG.Model.removeLastTag();
    TAG.View.removeLastTag();
  }

  return {
    init: init,
    persistTag: persistTag,
    deleteTag: deleteTag
  }
})(TAG.Model, TAG.View);