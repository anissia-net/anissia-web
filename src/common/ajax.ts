import {ajaxStateStore} from "./ajaxStateStore";
import Result from "./Result";
import sessionService from "../domain/session/remote/sessionService";

/**
 * ajax Util
 */
class Ajax {
  private ajaxState: any = null;

  fetch(url: string, body: any = null, options: any = null): Promise<Result<any>> {
    if (!this.ajaxState) {
      this.ajaxState = ajaxStateStore();
    }
    const toId = setTimeout(() => this.ajaxState.setLoading(), 500);
    if (!options) {
      options = {};
    }
    if (!options.headers) {
      options.headers = {};
    }
    options.headers['jwt'] = sessionService.getJwt();
    if (body) {
      options.body = typeof body == 'string' ? body : JSON.stringify(body);
    }
    // @ts-ignore
    return fetch(url, {...options}).then(e => {
      clearTimeout(toId);
      if (!e.ok) {
        switch (e.status) {
          case 523:
            this.ajaxState.setError();
        }
        throw `server status: ${e.status}`;
      }
      this.ajaxState.setOk();
      return e.json().then(e => Result.assign(e));
    }).catch(error => {
      clearTimeout(toId);
      if (error && error?.name == 'TypeError' && error.message == 'Failed to fetch') {
        this.ajaxState.setError();
      }
    })
  }

  get(url: string, body: any = null, options: any = null): Promise<Result<any>> {
    return this.fetch(url, body, {headers: {'Content-Type': 'application/json'}, method: 'GET', ...options});
  }

  post(url: string, body: any = null, options: any = null): Promise<Result<any>> {
    return this.fetch(url, body, {headers: {'Content-Type': 'application/json'}, method: 'POST', ...options});
  }

  delete(url: string, body: any = null, options: any = null): Promise<Result<any>> {
    return this.fetch(url, body, {headers: {'Content-Type': 'application/json'}, method: 'DELETE', ...options});
  }

  put(url: string, body: any = null, options: any = null): Promise<Result<any>> {
    return this.fetch(url, body, {headers: {'Content-Type': 'application/json'}, method: 'PUT', ...options});
  }

  public toGetParam(obj: any): string {
    let qd = [];
    for (const name in obj) {
      qd.push(`${name}=${encodeURIComponent(obj[name])}`);
    }
    return qd.join('&');
  }
}

export default new Ajax();
