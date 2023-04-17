export default class Session {

  public no = 0;
  public email = '';
  public name = '';
  public roles = [] as string[];
  public exp = 0;

  public get expired(): boolean {
    return (this.exp * 1000) <= new Date().getTime();
  }

  public get isLogin(): boolean {
    return !this.expired;
  }

  public get isRoot() {
    return this.hasRole('ROOT');
  }

  public get isAdmin() {
    return this.hasRole('ROOT', 'TRANSLATOR');
  }

  public get needRenewSession(): boolean {
    const time = (this.exp * 1000) - new Date().getTime();
    return time > 0 && time < (11 * 60000); // left in 11 minute
  }

  public hasRole(...roles: string[]) {
    if (roles.length == 0) {
      return true;
    }
    for (let i = 0 ; i < roles.length ; i++) {
      if (this.roles.indexOf(roles[i]) != -1) {
        return true;
      }
    }
    return false;
  }

  private static decodeJwt(jwt: string): any {
    const base64Url = jwt.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
    return JSON.parse(jsonPayload);
  }

  public static notLogin(): Session {
    return new Session();
  }

  public static assign(jwt: string): Session {
    if (jwt) {
      const jui = Session.decodeJwt(jwt)

      const session = new Session();

      session.no = Number(jui.jti || '0');
      session.email = jui.sub;
      session.name = jui.aud;
      session.roles = (jui.roles || '').split(',').filter((e: string) => e != '');
      session.exp = Number(jui.exp || '0');

      return session;
    } else {
      return Session.notLogin();
    }
  }
}
