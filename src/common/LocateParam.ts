export class LocateParam {
    constructor(key: string, value: string) {
        this.key = key;
        this.value = value;
    }

    public readonly key: string = '';
    public readonly value: string = '';

    public get url(): string {
        return encodeURIComponent(this.key) + '=' + encodeURIComponent(this.value);
    }
}

