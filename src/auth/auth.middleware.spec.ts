import { AuthMiddleware } from './infrastructure/auth.middleware';

describe('AuthMiddleware', () => {
  it('should be defined', () => {
    expect(new AuthMiddleware()).toBeDefined();
  });
});
