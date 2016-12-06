var TAG = TAG || {}

TAG.TagModule = (function() {

  //Constructor
  function Tag(id, xCoordinate, yCoordinate, name) {
    this.id          = id;
    this.xCoordinate = Math.floor(xCoordinate);
    this.yCoordinate = Math.floor(yCoordinate);
    this.name        = name;
  }

  return {
    Tag: Tag,
  }
})();