export class DateFormat {
  private date: Date = new Date();

  constructor(date?: Date) {
    if (date) {
      this.date = date;
    }
  }

  /**
   * 2020-12-11
   * 2020-12-11T00:04:37
   * 2020-12-11T00:04:37+00:00
   * 2020-12-11T00:04:37-00:00
   * 2020-12-11T00:04:37.324-00:00
   * 2020-12-11T00:04:37Z
   * 2020-12-11T00:04:37
   * @param isoDate iso 8601 date
   */
  public parseIsoDate(isoDate: string): DateFormat {
    let date = isoDate;
    let timezoneOffset = 0;
    let rv = new Date();

    // get timezone
    if (date.endsWith('Z')) {
      date = date.substring(0, date.length - 1);
      timezoneOffset = rv.getTimezoneOffset();
    } else if ((/[+-][\d]{2}:[\d]{2}$/).test(date)) {
      date = date.substring(0, date.length - 3) + date.substr(-2);
    }
    if ((/[+-][\d]{2}[\d]{2}$/).test(date)) {
      const tz = date.substr(-5);
      const tzm = ((Number(tz.substr(1, 2)) * 60) + Number(tz.substr(3, 2))) * (tz.substr(0, 1) === '+' ? 1 : -1);
      date = date.substring(0, date.length - 5);
      timezoneOffset = tzm + rv.getTimezoneOffset();
    }

    // parse
    if ((/^[\d]{4}-[\d]{2}-[\d]{2}$/).test(date)) {
      rv = new Date(Number(date.substr(0, 4)), Number(date.substr(5, 2)) - 1, Number(date.substr(8, 2)));
    } else if ((/^[\d]{4}-[\d]{2}-[\d]{2}T[\d]{2}:[\d]{2}:[\d]{2}$/).test(date)) {
      rv = new Date(
        Number(date.substr(0, 4)), Number(date.substr(5, 2)) - 1, Number(date.substr(8, 2)),
        Number(date.substr(11, 2)), Number(date.substr(14, 2)), Number(date.substr(17, 2)));
    } else if ((/^[\d]{4}-[\d]{2}-[\d]{2}T[\d]{2}:[\d]{2}:[\d]{2}\.[\d]{1,7}$/).test(date)) {
      if (date.length > 23) {
        date = date.substring(0, 23);
      }
      rv = new Date(
        Number(date.substr(0, 4)), Number(date.substr(5, 2)) - 1, Number(date.substr(8, 2)),
        Number(date.substr(11, 2)), Number(date.substr(14, 2)), Number(date.substr(17, 2)), Number(date.substr(20)));
    } else {
      throw new Error(`${isoDate} is not iso 8601 format`);
    }

    // shift
    if (timezoneOffset !== 0) {
      rv.setMinutes(rv.getMinutes() - timezoneOffset);
    }

    this.date = rv;
    return this;
  }

  /**
   * add day
   * @param date
   * @param amount
   */
  public addDate(amount: number): DateFormat {
    this.date.setDate(this.date.getDate() + amount);
    return this;
  }

  /**
   * add month
   * @param date
   * @param amount
   */
  public addMonth(amount: number): DateFormat {
    this.date.setMonth(this.date.getMonth() + amount);
    return this;
  }

  /**
   * add year
   * @param date
   * @param amount
   */
  public addYear(amount: number): DateFormat {
    this.date.setFullYear(this.date.getFullYear() + amount);
    return this;
  }

  public format(format: string): string {
    let rv = format;
    rv = rv.replace(/yyyy/g, this.date.getFullYear().toString());
    rv = rv.replace(/MM/g, (`0${this.date.getMonth() + 1}`.slice(-2)));
    rv = rv.replace(/dd/g, (`0${this.date.getDate()}`.slice(-2)));
    rv = rv.replace(/HH/g, (`0${this.date.getHours()}`.slice(-2)));
    rv = rv.replace(/mm/g, (`0${this.date.getMinutes()}`.slice(-2)));
    rv = rv.replace(/ss/g, (`0${this.date.getSeconds()}`.slice(-2)));
    rv = rv.replace(/zzz/g, (`00${this.date.getMilliseconds()}`.slice(-3)));
    return rv;
  }

  public parse(date: string, format: string): DateFormat {
    let t: number;
    this.date = new Date(2000, 0, 1, 0, 0, 0, 0); // prevent the leap year exception

    t = format.indexOf('zzz');
    this.date.setMilliseconds(t !== -1 ? Number(date.substring(t, t + 3)) : 0);

    t = format.indexOf('ss');
    this.date.setSeconds(t !== -1 ? Number(date.substring(t, t + 2)) : 0);

    t = format.indexOf('mm');
    this.date.setMinutes(t !== -1 ? Number(date.substring(t, t + 2)) : 0);

    t = format.indexOf('HH');
    this.date.setHours(t !== -1 ? Number(date.substring(t, t + 2)) : 0);

    t = format.indexOf('dd');
    this.date.setDate(t !== -1 ? Number(date.substring(t, t + 2)) : 1);

    t = format.indexOf('MM');
    this.date.setMonth(t !== -1 ? Number(date.substring(t, t + 2)) - 1 : 0);

    t = format.indexOf('yyyy');
    this.date.setFullYear(t !== -1 ? Number(date.substring(t, t + 4)) : 2000);

    return this;
  }

  public toDate(): Date {
    return this.date;
  }
}
