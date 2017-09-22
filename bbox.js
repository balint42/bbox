
class Bbox {
  constructor(params) {
    this.assertCtorParams(params);
    const diagonalType = params.bottomLeft && params.topRight;
    if (diagonalType) {
      this.assertCoords(params.bottomLeft, params.topRight);
      this.bottomLeft = params.bottomLeft;
      this.bottomRight = { lng: params.topRight.lng, lat: params.bottomLeft.lat };
      this.topRight = params.topRight;
      this.topLeft = { lng: params.bottomLeft.lng, lat: params.topRight.lat };
    } else {
      this.assertCoords(params.bottomRight, params.topLeft);
      this.bottomRight = params.bottomRight;
      this.bottomLeft = { lng: params.topLeft.lng, lat: params.bottomRight.lat };
      this.topLeft = params.topLeft;
      this.topRight = { lng: params.bottomRight.lng, lat: params.topLeft.lat };
    }
  }
  assertCtorParams(params) {
    if (!(
      (params.bottomLeft && params.topRight) ||
      (params.bottomRight && params.topLeft)
    )) {
      throw new Error('Two non-adjacent corners required to construct bounding box');
    }
  }
  assertFactoryParams(params) {
    if (!(params instanceof Object)) {
      throw new Error('params: object required with "params"');
    }
    if (!Array.isArray(params.corners) || params.corners.length === 0) {
      throw new Error('params: array required with "corners"');
    }
    this.assertCornerLabels(params.corners);
    if (Array.isArray(params.coords)) {
      this.assertCoordLabels(params.coords);
    }
  }
  assertCornerLabels(corners) {
    const cornerLabels = ['bottomRight', 'bottomLeft', 'topRight', 'topLeft'];
    corners.forEach(corner => {
      if (!cornerLabels.includes(corner)) {
        throw new Error(`"corners" array items must be one of ${cornerLabels}`);
      }
    });
  }
  assertCoordLabels(coords) {
    const coordLabels = ['lng', 'lat'];
    coords.forEach(coord => {
      if (!coordLabels.includes(coord)) {
        throw new Error(`"coords" array items must be one of ${coordLabels}`);
      }
    });
  }
  assertCoords(...coordObjects) {
    const filteredObjs = coordObjects.filter(v => !!v);
    if (filteredObjs.length === 0) {
      throw new Error('coords object required');
    }
    filteredObjs.forEach(coords => {
      if (!(coords.hasOwnProperty('lat') && coords.hasOwnProperty('lng'))) {
        throw new Error('Coordinate objects must have format { lng, lat }');
      }
      if (!(coords.lat <= 90 && coords.lat >= -90)) {
        throw new Error('latitude has to be in interval [-90, 90]');
      }
      if (!(coords.lng <= 180 && coords.lng >= -180)) {
        throw new Error('latitude has to be in interval [-180, 180]');
      }
    });
  }
  createCoordsString(params) {
    this.assertCoords(params.coordsObj);
    const coordsObj = params.coordsObj;
    const coords = params.coords && params.coords.length ? params.coords : ['lng', 'lat'];
    const separator = params.separator || ',';
    const intialString = '';
    return coords.reduce(
      (res, coord, index, array) => {
        res += coordsObj[coord];
        res += (index !== array.length - 1) ? separator : '';
        return res;
      },
      intialString
    );
  }
  createBboxString(params) {
    this.assertFactoryParams(params);
    const corners = params.corners;
    const coords = params.coords;
    const coordSeparator = params.coordSeparator;
    const cornerSeparator = params.cornerSeparator || ';';
    const intialString = '';
    return corners.reduce(
      (res, corner, index, array) => {
        res += this.createCoordsString({
          coords,
          coordsObj: this[corner],
          separator: coordSeparator
        });
        res += (index !== array.length - 1) ? cornerSeparator : '';
        return res;
      },
      intialString
    );
  }
}

module.exports = Bbox;
