import {DateFormat} from "./DateFormat";
import {LocationQuery} from "vue-router";

class Anissia {
    /**
     * pure week: 0:sun,1:mon...6:sat
     * week extension: 7:other, 8:new
     */
    public isPureWeek(week: number | string): boolean {
        return [7, 8].indexOf(Number(week)) === -1;
    }

    public toKoWeek(week: number | string) {
        return (['일', '월', '화', '수', '목', '금', '토', '外', '新'])[Number(week)];
    }

    public toKo12Time(time: string) {
        if (time.localeCompare('11:59') > 0) {
            const hour = Number(time.substring(0, 2));
            return '오후 ' + ('0'+ (hour > 12 ? hour -12 : hour)).slice(-2) + time.substring(2);
        } else {
            return '오전 ' + time;
        }
    }

    public getSubjectPrefix(week: string, status: string, startDate: string, endDate: string) {
        const today = new DateFormat().format("yyyy-MM-dd"); // ex) 1988-10-17
        if (this.isPureWeek(Number(week))) { // is not status
            if (status === 'OFF') { // is not status
                return '결방';
            } else if (today.localeCompare(startDate) <= 0) { // not yet start anime
                return startDate.substring(5);
            } else if (this.animeIsEnded(endDate)) { // anime end
                return '完';
            }
        }
        return '';
    }

    public animeIsEnded(endDate: string): boolean {
        const today = new DateFormat().format("yyyy-MM-dd"); // ex) 1988-10-17
        return endDate !== '' && today.localeCompare(endDate) >= 0;
    }

    public animePeriod(week: string, startDate: string, endDate: string): string {
        if (startDate !== '' || endDate !== '') {
            const sd = startDate.replace(/-99/g, '');
            const ed = endDate.replace(/-99/g, '');
            let rv = '';
            if (sd && ed) { // exist both
                rv = sd === ed ? sd : `${sd}  ~  ${ed}`;
            } else { // exist only one side
                rv = sd + ed;
                if (this.isPureWeek(Number(week)) && sd) { // is day and exsit only start date
                    rv += '  ~  방영중';
                }
            }
            // change date format : yyyy-MM-dd -> yyyy년 MM월 dd일
            return (`${rv} `
                .replace(/([\d]{4})-([\d]{2})-([\d]{2})/g, '$1. $2. $3.')
                .replace(/([\d]{4})-([\d]{2})/g, '$1. $2.')
                .replace(/([\d]{4}) /g, '$1.'))
                .trim();
        }
        return '';
    }

    public ymdOrDynamicAgo(date: string|number): string {
        return this.formatOrDynamicAgo(date, 'yyyy-MM-dd');
    }

    public toParams(query: LocationQuery, name: string): string[] {
        const pa = query[name];
        if (!pa) {
            return [];
        } else if (typeof pa == 'string') {
            return [pa];
        } else {
            return pa as string[];
        }
    }

    public dateFormat(date: Date, format: string): string {
        let rv = format;
        rv = rv.replace(/yyyy/g, date.getFullYear().toString());
        rv = rv.replace(/MM/g, ("0" + (date.getMonth() + 1)).slice(-2));
        rv = rv.replace(/dd/g, ("0" + date.getDate()).slice(-2));
        rv = rv.replace(/HH/g, ("0" + date.getHours()).slice(-2));
        rv = rv.replace(/mm/g, ("0" + date.getMinutes()).slice(-2));
        rv = rv.replace(/ss/g, ("0" + date.getSeconds()).slice(-2));
        rv = rv.replace(/zzz/g, ("00" + date.getMilliseconds()).slice(-3));
        return rv;
    }

    public toParam(query: LocationQuery, name: string, defaultValue: string|null = null): string|null {
        return this.toParams(query, name)[0] || defaultValue;
    }

    public formatOrDynamicAgo(inputDate: string|number, format: string): string {
        let date;
        if (typeof inputDate === 'string') {
            date = new DateFormat().parseIsoDate(inputDate).toDate();
        } else if (typeof inputDate === 'number') {
            date = new Date(inputDate);
        } else {
            return '';
        }

        let time = Math.floor(date.getTime() / 1000);
        let now = Math.floor(new Date().getTime() / 1000);
        if (time > now) {
            return '방금전';
        }
        if ((time + 60) > now) { // in 60 seconds
            return `${now - time}초 전`;
        }
        now = Math.floor(now / 60);
        time = Math.floor(time / 60);
        if ((time + 60) > now) { // in 60 minutes
            return `${now - time}분 전`;
        }
        now = Math.floor(now / 60);
        time = Math.floor(time / 60);
        if ((time + 24) > now) { // in 24 hours
            return `${now - time}시간 전`;
        }
        now = Math.floor(now / 24);
        time = Math.floor(time / 24);
        if ((time + 30) > now) { // in 24 hours
            return `${now - time}일 전`;
        }
        return new DateFormat(date).format(format);
    }
    
    public fieldToText(field: string): string {
        switch (field) {
            case 'subject' : return '제목';
            case 'originalSubject' : return '원제';
            case 'status' : return '상태';
            case 'week' : return '요일';
            case 'time' : return '시간';
            case 'genres' : return '장르';
            case 'twitter' : return '트위터';
            case 'startDate' : return '시작일';
            case 'endDate' : return '종료일';
            case 'website' : return '웹사이트';
        }
        return field;
    }

    public deCombineAnimeDate(animeDate: string, callback: (type: string, year: string, month: string, date: string) => void) {
        if (!animeDate || (!(/^\d{4}-\d{2}-\d{2}$/).test(animeDate))) {
            callback('N/A', '', '', '');
        } else if (animeDate.endsWith('-99-99')) {
            callback('Y', animeDate.substring(0, 4), '', '');
        } else if (animeDate.endsWith('-99')) {
            callback('YM', animeDate.substring(0, 4), animeDate.substring(5, 7), '');
        } else {
            callback('YMD', animeDate.substring(0, 4), animeDate.substring(5, 7), animeDate.substring(8, 10));
        }
    }

    public combineAnimeDate(type: string, year: string, month: string, date: string): string {
        let ymd = '';
        if (type == 'YMD') {
            ymd = `${year}-${month}-${date}`;
        } else if (type == 'YM') {
            ymd = `${year}-${month}-99`;
        } else if (type == 'Y') {
            ymd = `${year}-99-99`;
        }
        return (/^\d{4}-\d{2}-\d{2}$/).test(ymd) ? ymd : '';
    }

    // just checking the format
    public checkAnimeDate(type: string, animeDate: string): boolean {
        if ((/^\d{4}-\d{2}-\d{2}$/).test(animeDate)) {
            return true;
        }
        return (animeDate == '' && type == 'N/A');
    }

    public animeStatusToText(status: string, pureWeek: boolean): string {
        switch (status) {
            case 'ON': return pureWeek ? '방영중' : `신작/기타`;
            case 'OFF': return '결방';
            case 'END': return '완결';
            case 'DEL': return '삭제대기';
            case 'REQ': return '등록요청';
        }
        return '';
    }

    public url(url: string, exactly: boolean = false): boolean {
        const path = location.pathname;
        return path == url || (!exactly && path.startsWith(`${url}/`));
    }

    public enHtml(text: string): string {
        const div = document.createElement('div');
        div.innerText = text;
        return div.innerHTML;
    }

    public src(src: string): string {
        return new URL(src, import.meta.url).href;
    }
}

export default new Anissia();