var TAG = TAG || {}

TAG.Controller = (function(Model, View) {
  var init = function() {
    TAG.View.init();
  }
  return {
    init: init,
  }
})(TAG.Model, TAG.View);