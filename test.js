var QuadTree = require('./quadtree'); 
var gentest = require('../gentest');

var t = gentest.types;

var genQuadtree = t.fmap(function(tuple){
    return new QuadTree(tuple[0], tuple[1], tuple[2], tuple[3]);
  },
  t.tuple([t.int, t.int, t.int.positive, t.int.positive])
);

var genObj = t.shape({
  cx: t.int,
  cy: t.int,
  w: t.int.positive,
  h: t.int.positive
});

forAll([t.int, t.int, t.int.positive, t.int.positive],
       'quadtrees can be created',
       function(cx, cy, w, h) {
    var qt = new QuadTree(cx, cy, w, h);
  return qt.cx === cx && qt.cy == cy && qt.w == w && qt.h == h;
});

var colliding = function(a, b){
  var left =   function(obj){ return obj.cx - obj.w/2 };
  var right =  function(obj){ return obj.cx + obj.w/2 };
  var top =    function(obj){ return obj.cy - obj.h/2 };
  var bottom = function(obj){ return obj.cy + obj.h/2 };
  return (left(a) < right(b) && left(b) < right(a) &&
          top(a) < bottom(b) && top(b) < bottom(a));
};

forAll([genQuadtree, genObj, genObj],
       'quadtree accurately reports collisions',
       function(qt, a, b){
         qt.insert(a);
         qt.insert(b);
         aCols = qt.collisions(a);
         bCols = qt.collisions(b);
         if (colliding(a, b)){
           return (aCols.length === 1 && bCols.length === 1 &&
                   aCols[0] === b && bCols[0] === a);
         }
         return aCols.length === 0 && bCols.length === 0;
       }
    );

