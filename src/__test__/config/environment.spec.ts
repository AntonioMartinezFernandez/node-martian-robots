import { HTTP_PORT } from '@config/environment';

describe('Environment test', () => {
  it('should return http port defined in environment configuration file', () => {
    const sut = HTTP_PORT.toString();
    expect(sut).toBe('3000');
  });
});
