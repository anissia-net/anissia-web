import {sessionStore} from "../sessionStore";
import Session from "../Session";
import sessionRemote from "./sessionRemote";
import LoginInfo from "../LoginInfo";
import Result from "../../../common/Result";
import {Router} from "vue-router";
import {Locate} from "../../../common/Locate";

class SessionService {

    /**
     * 로그인 시도
     * @return 성공여부 SessionService.amendPathBySession 호출바람.
     */
    public login(email: string, password: string, makeLoginToken: boolean): Promise<boolean> {
        return new Promise(resolve => {
            if (!(makeLoginToken && !confirm('정말로 자동로그인을 사용하시겠습니까?\n- 로그인정보가 현 기기에 저장됩니다.\n- 공공장소에서는 절대 사용하지 마십시오.'))) {
                sessionRemote.login(email, password, makeLoginToken)
                    .then(res => {
                        if (res.success) {
                            this.applyLoginInfo(res)
                        } else {
                            res.toastErrorMessage();
                        }
                        resolve(res.success);
                    });
            }
        });
    }

    /**
     * 세션 동기화
     *
     * 로그인 상태인지 확인
     * - 로그인 상태이면 세션(jwt) 갱신이 필요한지 확인.
     *   - jwt 갱신이 필요하면 갱신
     * - 로그인 상태가 아닌경우.
     *   - 쿠키에 jwt 가 있는지 확인.
     *     - jwt 가 있으면 세션에 저장.
     *     - jwt 가 없으면 tokenLogin 시도.
     * @return 성공여부 SessionService.amendPathBySession 호출바람.
     */
    public sync(): Promise<boolean> {
        return new Promise(resolve => {
            const user = sessionStore().user;
            if (user.isLogin) {
                if (user.needRenewSession) {
                    sessionRemote.updateJwt().then(res => {
                        resolve(this.applyLoginInfo(res));
                    });
                } else {
                    resolve(true);
                }
            } else {
                let session = Session.assign(this.getJwt())
                sessionStore().setUser(session);
                if (session.isLogin) {
                    resolve(true);
                } else {
                    this.tokenLogin().then(r => resolve(r));
                }
            }
        });
    }

    public logout() {
        this.deleteJwt();
        localStorage.removeItem('auth-token');
        sessionStore().setUser(Session.notLogin());
    }

    /**
     * 로그인 상태에 맞지 않는 path 에 있을 경우 강제 이동시킴.
     * @warning onBeforeRouteEnter 에서 사용시 next() 를 인자로 넘겨주어야함.
     */
    public amendPathBySession(path: string, router: Router, next: Function = () => {}) {
        const user = sessionStore().user;
        const isLogin = user.isLogin;
        const isAdmin = user.isAdmin;

        if (isLogin) {
            if (path.startsWith('/login') || path.startsWith('/register') || path.startsWith('/recover')) {
                const path = new Locate().getParameter('path', '');
                router.push(path && path.startsWith('/') ? path : '/');
            } else if ((path.startsWith('/admin')) && !isAdmin) {
                router.push(`/`);
            } else {
                next();
            }
        } else {
            if (path.startsWith('/account') || path.startsWith('/admin')) {
                router.push(`/login?path=${encodeURIComponent(path)}`);
            } else {
                next();
            }
        }
    }

    /**
     * sync 에서 사용하는 tokenLogin
     * @warning sync 에서만 사용할것.
     */
    private tokenLogin(): Promise<boolean> {
        return new Promise(resolve => {
            const token = localStorage.getItem('auth-token');
            if (token) {
                sessionRemote.tokenLogin(token).then(res => {
                    if (this.applyLoginInfo(res)) {
                        resolve(true);
                    } else {
                        this.logout();
                        resolve(false);
                    }
                });
            } else {
                resolve(false);
            }
        });
    }

    public getJwt(): string {
        return document.cookie.split(/\s*;\s*/)?.find(e => e.startsWith('jwt='))?.substring(4) || '';
    }

    private deleteJwt() {
        document.cookie = `jwt=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT`;
    }

    private applyLoginInfo(loginInfoResult: Result<LoginInfo>): boolean {
        let result = false;
        try {
            if (loginInfoResult.success) {
                const data = loginInfoResult.data!!;
                if (data.jwt) {
                    document.cookie = `jwt=${data.jwt};path=/`;
                }
                if (data.token) {
                    localStorage.setItem('auth-token', data.token);
                }
                const session = Session.assign(this.getJwt())
                sessionStore().setUser(session);
                result = true;
            }
        } catch (e) { }
        if (!result) {
            this.deleteJwt();
        }
        return result;
    }
}

export default new SessionService();
