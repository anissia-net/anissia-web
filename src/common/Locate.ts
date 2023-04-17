import {LocateParam} from "./LocateParam";

export class Locate {

    constructor(href: string = location.href) {
        this.bind(href);
    }

    public bind(href: string) {
        let cmd = href;

        const iHash = cmd.indexOf('#');
        if (iHash != -1) {
            this.hash = cmd.substring(iHash);
            cmd = cmd.substring(0, iHash);
        }

        const iSearch = cmd.indexOf('?');
        if (iSearch != -1) {
            this.params = cmd.substring(iSearch + 1)
                .split('&')
                .filter((e) => e.indexOf('=') !== -1)
                .map((e) => new LocateParam(
                    decodeURIComponent(e.substring(0, e.indexOf('='))),
                    decodeURIComponent(e.substring(e.indexOf('=') + 1))
                ));
            cmd = cmd.substring(0, iSearch);
        }

        cmd = cmd.replace('://', '');
        const iPath = cmd.indexOf('/');
        if (iPath == -1) {
            this.path = cmd.substring(iPath);
        }
    }

    public path: string = '';
    public params: LocateParam[] = [];
    public hash: string = ''; // ex '', '#', '#abc'

    public get fullPath(): string {
        const params = this.params.map(e => e.url).join('&');
        return this.path + (params ? `?${params}` : '') + this.path;
    }

    public getParameters(key: string): string[] {
        return this.params.filter(e => e.key == key).map(e => e.value);
    }

    public getParameter(key: string, defaultValue: string|null = null): string|null {
        return this.getParameters(key)[0] || defaultValue;
    }

    public getIntParameter(key: string, defaultValue: number): number {
        const val = Number(this.getParameters(key)[0]);
        return isNaN(val) ? defaultValue : val;
    }

    public delParameter(key: string): Locate {
        this.params = this.params.filter(e => e.key != key);
        return this;
    }

    public addParameter(key: string, value: string): Locate {
        this.delParameter(key);
        this.params.push(new LocateParam(key, value));
        return this;
    }

    public setParameter(key: string, value: string): Locate {
        return this.delParameter(key).addParameter(key, value);
    }
}
