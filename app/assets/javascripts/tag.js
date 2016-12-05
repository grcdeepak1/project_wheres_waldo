var TAG = TAG || {}

TAG.TagModule = (function() {

  //Constructor
  function Tag(xCoordinate, yCoordinate, name) {
    this.xCoordinate = xCoordinate;
    this.yCoordinate = yCoordinate;
    this.name        = name;
  }

  return {
    Tag: Tag,
  }
})();