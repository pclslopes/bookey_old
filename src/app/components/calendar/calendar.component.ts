import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  currentMonth = new Date().getUTCMonth();
  currentYear = new Date().getUTCFullYear();;

  constructor() { }

  ngOnInit() {
    console.log("month: "+this.currentMonth);
    console.log("year: "+this.currentMonth);
  }

  getDaysInMonth(month , year): number {
    // Here January is 1 based
    //Day 0 is the last day in the previous month
    return new Date(year, month, 0).getDate();
    // Here January is 0 based
    // return new Date(year, month+1, 0).getDate();
  };

  getWeekDayFromDate(date: Date): string{
    return date.toLocaleString('en-us', {  weekday: 'long' });
  }
}