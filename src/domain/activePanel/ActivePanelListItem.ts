import anissia from "../../common/anissia";

export default class ActivePanelListItem {

    public static codeAnimeChangedListFields = ['subject', 'originalSubject', 'status', 'week', 'time', 'genres', 'twitter', 'startDate', 'endDate', 'website'];

    public apNo = 0;
    public code = '';
    public data1 = '';
    public data2 = '';
    public data3 = '';
    public published = true
    public regTime = 0;
    public status = '';

    public openDetail = false;

    public get hasDetail(): boolean {
        return this.code == 'ANIME' && this.status == 'U';
    }

    public get regDtText(): string {
        return anissia.ymdOrDynamicAgo(this.regTime);
    }

    public get codeAnimeChangedList(): any[] {
        const prev = JSON.parse(this.data2);
        const next = JSON.parse(this.data3);
        return ActivePanelListItem.codeAnimeChangedListFields
            .filter(field => prev[field] != next[field])
            .map(field => {
                const nm = anissia.fieldToText(field);
                let pv = prev[field] || '-';
                let nv = next[field] || '-';

                switch (field) {
                    case 'startDate': case 'endDate':
                        pv = pv.replace(/-99/g, '');
                        nv = nv.replace(/-99/g, '');
                        break;
                    case 'status':
                        const pureWeek = anissia.isPureWeek(pv.week);
                        pv = anissia.animeStatusToText(pv, pureWeek);
                        nv = anissia.animeStatusToText(nv, pureWeek);
                        break;
                    case 'week':
                        pv = anissia.toKoWeek(pv);
                        nv = anissia.toKoWeek(nv);
                }
                return {nm, pv, nv};
            });
    }

    public get html(): string {
        if (this.code == 'TEXT') {
            return ActivePanelListItem.toHtml(this.data1);
        } else if (this.code == 'ANIME') {
            return ActivePanelListItem.toHtml(this.data1);
        } else if (this.code == 'DEL') {
            return ActivePanelListItem.toHtml(this.data1);
        } else {
            return '';
        }
    }

    private static toHtml(text: string) {
        const t = anissia.enHtml(text);
        if (t.split('[').length == t.split(']').length) {
            return t.replace(/\[/g, '<b>').replace(/\]/g, '</b>');
        } else {
            return t;
        }
    }
}