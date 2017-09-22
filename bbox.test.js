Bbox = require('./bbox.js');
assert = require('assert');

const corners = {
  bottomLeft: {
    lng: 5.98865807458,
    lat: 47.3024876979,
  },
  topRight: {
    lng: 15.0169958839,
    lat: 54.983104153,
  },
};
const wrongCorners1 = {
  bottomLeft: {
    lng: 5.98865807458,
    lat: 47.3024876979,
  },
  topLeft: {
    lng: 5.98865807458,
    lat: 54.983104153,
  },
};
const wrongCorners2 = {
  bottomLeft: {
    lng: -185.98865807458,
    lat: 47.3024876979,
  },
  topRight: {
    lng: 15.0169958839,
    lat: 54.983104153,
  },
};
const wrongCorners3 = {
  bottomLeft: {
    lng: 5.98865807458,
  },
  topRight: {
    lng: 15.0169958839,
    lat: 54.983104153,
  },
};

assert.throws(() => new Bbox(wrongCorners1), Error);
assert.throws(() => new Bbox(wrongCorners2), Error);
assert.throws(() => new Bbox(wrongCorners3), Error);
const bbox = new Bbox(corners);
assert(bbox.bottomLeft && bbox.topRight && bbox.bottomRight && bbox.topLeft);

assert.throws(() => bbox.createBboxString({}), Error);
assert.throws(() => bbox.createBboxString({ corners: [] }), Error);
assert.throws(() => bbox.createBboxString({ corners: ['foobar'] }), Error);
assert.throws(() => bbox.createBboxString({ corners: ['bottomLeft', 'bottomRight'], coords: ['foobar'] }), Error);
assert.throws(() => bbox.createBboxString({ corners: ['bottomLeft', 'bottomRight'], coords: [''] }), Error);

const res0 = bbox.createBboxString({ corners: ['bottomLeft', 'bottomRight'] });
assert(res0 === '5.98865807458,47.3024876979;15.0169958839,47.3024876979');
let res = bbox.createBboxString({ corners: ['bottomLeft', 'bottomRight','topLeft', 'topRight'] });
assert(res === res0 + ';5.98865807458,54.983104153;15.0169958839,54.983104153');
res = bbox.createBboxString({ corners: ['bottomLeft', 'bottomRight'], coords: [] });
assert(res === res0);
res = bbox.createBboxString({ corners: ['bottomLeft', 'bottomRight'], coords: ['lng', 'lat'] });
assert(res === res0);
res = bbox.createBboxString({ corners: ['bottomLeft', 'bottomRight'], coords: ['lng'] });
assert(res === '5.98865807458;15.0169958839');
res = bbox.createBboxString({ corners: ['bottomLeft', 'bottomRight'], coords: ['lat'] });
assert(res === '47.3024876979;47.3024876979');
res = bbox.createBboxString({ corners: ['bottomLeft', 'bottomRight'], coords: ['lat', 'lng'] });
assert(res === '47.3024876979,5.98865807458;47.3024876979,15.0169958839');

res = bbox.createBboxString({
  corners: ['bottomLeft', 'bottomRight'],
  cornerSeparator: ' | ',
  coordSeparator: ' , '
});
assert(res === '5.98865807458 , 47.3024876979 | 15.0169958839 , 47.3024876979');

console.log('\n\nOK\n\n');
