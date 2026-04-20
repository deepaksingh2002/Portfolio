export interface JwtPayload {
  id: string;
  email: string;
}

export interface RefreshTokenPayload extends JwtPayload {
  tokenType: 'refresh';
}
