export class SiteHistory {
    constructor(date: string, desc: string, link: string = '') {
        this.date = date;
        this.desc = desc;
        this.link = link;
    }
    public date = '';
    public desc = '';
    public link = '';

    public get key() {
        return this.date + this.desc + this.link;
    }
}
