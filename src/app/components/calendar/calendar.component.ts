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
  currentDate;
  currentMonth;
  currentYear;
  daysInCurrentMonth;
  currentMonthWeekDayStart;
  currentMonthDaysArray;
  selectedDay;
  selectedMonth;
  calendarType = "ranges";
  ranges = [{from:"10 Jul 2019", to:"15 Jul 2019", name:"Pedro Lopes", id:""}, {from:"20 Jul 2019", to:"25 Jul 2019", name:"Johnny Lopes", id:""}];

  constructor() { }

  ngOnInit() {
    this.currentDate = new Date();
    this.calculateCalendar();
  }

  calculateCalendar(){
    this.currentMonth = new Date(this.currentDate).getUTCMonth();
    this.currentYear = new Date(this.currentDate).getUTCFullYear();
    this.currentMonthWeekDayStart = this.getWeekDayFromDate(new Date("01 "+ this.monthNames[this.currentMonth]+" "+this.currentYear));
    this.daysInCurrentMonth = this.getDaysInMonth(this.currentMonth+1, this.currentYear);
    this.currentMonthDaysArray = Array(this.daysInCurrentMonth+this.dayNamesFull.indexOf(this.currentMonthWeekDayStart)).fill(0).map((x,i)=>(i+1 > this.dayNamesFull.indexOf(this.currentMonthWeekDayStart) ? i+1-(this.dayNamesFull.indexOf(this.currentMonthWeekDayStart)): null));
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
    this.currentDate = new Date(this.currentDate.setMonth(this.currentDate.getMonth()+1));
    this.calculateCalendar();
  }

  previousMonth(){
    this.currentDate = new Date(this.currentDate.setMonth(this.currentDate.getMonth()-1));
    this.calculateCalendar();
  }

  onClick(test){
    alert(test);
  }

  dayClick(day){
    console.log("day click: "+day);
    this.selectedDay = day;
    this.selectedMonth = this.currentMonth;
  }

  getDayColor(day, month):string{
    let returnValue;
    var BreakException = {};

    if(this.ranges && this.calendarType === "ranges"){
      this.ranges.forEach((range) => {
        try{
          let rangeDate = new Date(range.from);
          let rangeFromDay = new Date(range.from).getUTCDate()+1;
          let rangeFromMonth = new Date(range.from).getUTCMonth()+1;
          let rangeToDay = new Date(range.to).getUTCDate()+1;
          let rangeToMonth = new Date(range.to).getUTCMonth()+1;

          // Start of range
          if(rangeFromDay === day && rangeFromMonth === month){
            returnValue = "start_range"; //'#ff5a5f'
            throw BreakException;
          }
          
          // Inside range
          if((day > rangeFromDay && rangeFromMonth >= month)
          && (day < rangeToDay && rangeToMonth <= month)){
            returnValue = "mid_range"; //#ff5a5f'
            throw BreakException;
          }
          
          // End of Range
          if(rangeToDay === day && rangeToMonth === month){
            returnValue = "end_range"; //'#ff5a5f'
            throw BreakException;
          }

          //returnValue = "";
          //throw BreakException;
        } catch (e) {
          if (e !== BreakException) throw e;
        }
      });
    }
    return returnValue;
  }

  setStyles(day, month) {

    let dayColorType = this.getDayColor(day, month);
      ///console.log("dayColorType: "+dayColorType + " day: " +day + " month: "+month);
    let styles = {
      'background-color': dayColorType === 'start_range' || dayColorType === 'end_range' ? '#ff5a5f' : dayColorType === 'mid_range' ? '#E39695' : '',
    };
    return styles;
  }
}