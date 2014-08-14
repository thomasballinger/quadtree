
function QuadTree(cx, cy, w, h){
  this.cx = cx;
  this.cy = cy;
  this.w = w;
  this.h = h;
}

QuadTree.prototype._makeChildren = function(){
  this.children = [
    QuadTree(this.x - this.w / 2, this.y - this.w / 2, w/2, h/2),
    QuadTree(this.x + this.w / 2, this.y - this.w / 2, w/2, h/2),
    QuadTree(this.x - this.w / 2, this.y + this.w / 2, w/2, h/2),
    QuadTree(this.x + this.w / 2, this.y + this.w / 2, w/2, h/2),
  ];
}

QuadTree.prototype._lookup = function(obj){};

QuadTree.prototype.insert = function(obj){};
QuadTree.prototype.remove = function(obj){};
QuadTree.prototype.collisions = function(obj){};


module.exports = QuadTree
