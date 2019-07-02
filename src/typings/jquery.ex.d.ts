interface IFullCalendar {
  fullCalendar(name?: string, events?: Object[] | Function, flag?: boolean): void;
}

interface JQuery {
  fullCalendar(options?: Object): IFullCalendar;
}