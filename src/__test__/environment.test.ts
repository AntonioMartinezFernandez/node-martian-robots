import { HTTP_PORT } from '@src/config/environment';

describe('Environment test', () => {
  it('should return http port defined in environment configuration as string', () => {
    const sut = HTTP_PORT.toString();
    expect(sut).toBe('3000');
  });
});
