import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  dayNamesFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  currentMonth;
  currentYear;
  daysInCurrentMonth;
  currentMonthWeekDayStart;
  currentMonthDaysArray;

  constructor() { }

  ngOnInit() {
    this.currentMonth = new Date().getUTCMonth();
    this.currentYear = new Date().getUTCFullYear();
    this.currentMonthWeekDayStart = this.getWeekDayFromDate(new Date("01 "+ this.monthNames[this.currentMonth]+" "+this.currentYear));
    this.daysInCurrentMonth = this.getDaysInMonth(this.currentMonth+1, this.currentYear);
    this.currentMonthDaysArray = Array(this.daysInCurrentMonth+).fill(0).map((x,i)=>(i+1 > this.dayNamesFull.indexOf(this.currentMonthWeekDayStart) ? i+1-(this.dayNamesFull.indexOf(this.currentMonthWeekDayStart)): null));
    console.log("date: "+new Date());
    console.log("month: "+this.currentMonth);
    console.log("year: "+this.currentMonth);
    console.log("month weekday start: "+this.currentMonthWeekDayStart);
    console.log("Days in current month: "+this.daysInCurrentMonth);
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

  nextMonth(){
    this.currentMonth++;
  }

  previousMonth(){
    this.currentMonth--;
  }
}