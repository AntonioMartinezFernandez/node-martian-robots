import { APP_MAX_COORDINATE_VALUE } from '@config/environment';
import { ISurface } from '@domain/entities/ISurface';
import { surfaceSize, planetSurface } from '@domain/entities/types';

export class MarsSurface implements ISurface {
  private _minX;
  private _minY;
  private _maxX;
  private _maxY;

  constructor(
    surfaceLimits: planetSurface,
    private readonly _surfaceSize: surfaceSize,
  ) {
    this._minX = surfaceLimits[0];
    this._minY = surfaceLimits[1];
    this._maxX = surfaceLimits[2];
    this._maxY = surfaceLimits[3];
  }

  public build(): planetSurface | Error {
    const surfaceSize = this._surfaceSize[0].split(' ');

    const surface: planetSurface = [
      this._minX,
      this._minY,
      parseInt(surfaceSize[0]),
      parseInt(surfaceSize[1]),
    ];

    if (!surface[2] || !surface[3]) {
      return new Error('Invalid mission surface coordinates');
    }

    if (
      surface[2] < this._minX ||
      surface[2] > this._maxX ||
      this._maxX > parseInt(APP_MAX_COORDINATE_VALUE)
    ) {
      return new Error('Surface width out of range');
    }

    if (
      surface[3] < this._minY ||
      surface[3] > this._maxY ||
      this._maxY > parseInt(APP_MAX_COORDINATE_VALUE)
    ) {
      return new Error('Surface length out of range');
    }

    return surface;
  }
}
