export default class LoginInfo {
  public jwt = '';
  public token = '';

  public static assign(data: any): LoginInfo {
    return Object.assign(new LoginInfo(), data);
  }
}
