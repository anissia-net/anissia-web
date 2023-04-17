import {SiteMemberTag} from "./SiteMemberTag";

export class SiteMember {
    constructor(name: string, date: string, tags: string[]) {
        this.name = name;
        this.date = date;
        this.tags = tags.map(e => new SiteMemberTag(e.split('||')));
    }
    public name = '';
    public date = '';
    public tags = [] as SiteMemberTag[];

    public get key() {
        return this.name;
    }
}
