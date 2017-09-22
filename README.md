# bbox.js

A minimal geo-bounding-box helper class implemented in pure Javascript. It comes with minimal tests and one major and two minor features:

* __Create custom format output string__
* Interpolate all 4 box corners
* Validate absolute coordinates

Tests can be run using node: `node bbox.test.js`. Missing features:

* Validate coordinates relative to each other ("is `bottomRight` corner really the bottom?")

## Usage

The major motivation of bbox is to easily generate any type of string representation, specifying:

* the corners and order of corners printed: `corners: ['bottomLeft', 'bottomRight']`
* the coordinates and order of coordinates printed: `coords: ['lat', 'lng']`
* the separators for corners and coordinates: `cornerSeparator: '; '`, `coordSeparator: ', '`

```
Bbox = require('./bbox.js');

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
const bbox = new Bbox(corners);
// bbox now has: bbox.bottomLeft && bbox.topRight && bbox.bottomRight && bbox.topLeft

let res = bbox.createBboxString({ corners: ['bottomLeft', 'bottomRight'] });
// res is '5.98865807458,47.3024876979;15.0169958839,47.3024876979'

let res = bbox.createBboxString({ corners: ['bottomLeft', 'bottomRight','topLeft', 'topRight'] });
// res is '5.98865807458,47.3024876979;15.0169958839,47.3024876979;5.98865807458,54.983104153;15.0169958839,54.983104153'

res = bbox.createBboxString({ corners: ['bottomLeft', 'bottomRight'], coords: ['lng'] });
// res is '5.98865807458;15.0169958839'

res = bbox.createBboxString({ corners: ['bottomLeft', 'bottomRight'], coords: ['lat'] });
// res is '47.3024876979;47.3024876979'

res = bbox.createBboxString({ corners: ['bottomLeft', 'bottomRight'], coords: ['lat', 'lng'] });
// res is '47.3024876979,5.98865807458;47.3024876979,15.0169958839'

res = bbox.createBboxString({
  corners: ['bottomLeft', 'bottomRight'],
  cornerSeparator: ' | ',
  coordSeparator: ' , '
});
// res is '5.98865807458 , 47.3024876979 | 15.0169958839 , 47.3024876979'
```

