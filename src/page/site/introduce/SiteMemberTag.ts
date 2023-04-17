export class SiteMemberTag {
    constructor(line: string[]) {
        this.text = line[0] || '';
        this.link = line[1] || '';
    }
    public text = '';
    public link = '';

    public get key() {
        return this.text + this.link;
    }
}
