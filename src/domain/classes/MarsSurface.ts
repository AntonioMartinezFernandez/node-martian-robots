import { ISurface } from '@domain/entities/ISurface';
import { surfaceSize, planetSurface } from '@domain/entities/types';

export class MarsSurface implements ISurface {
  private _minX = 0;
  private _minY = 0;
  private _maxX;
  private _maxY;

  constructor(
    maxSurfaceSize: planetSurface,
    private readonly _surfaceSize: surfaceSize,
  ) {
    this._maxX = maxSurfaceSize[0];
    this._maxY = maxSurfaceSize[1];
  }

  public build(): planetSurface | Error {
    const surfaceSize = this._surfaceSize[0].split(' ');

    const surface: planetSurface = [
      parseInt(surfaceSize[0]),
      parseInt(surfaceSize[1]),
    ];

    if (!surface[0] || !surface[1]) {
      return new Error('Invalid surface coordinates');
    }

    if (surface[0] < this._minX || surface[0] > this._maxX) {
      return new Error('Surface width out of range');
    }

    if (surface[1] < this._minY || surface[1] > this._maxY) {
      return new Error('Surface length out of range');
    }

    return surface;
  }
}
