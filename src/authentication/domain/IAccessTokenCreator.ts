export interface AccessTokenCreator {
  getAccessToken(username: string, password: string): Promise<any>;
}
