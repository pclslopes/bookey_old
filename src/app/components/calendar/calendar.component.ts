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
  displayDate;
  daysInCurrentMonth;
  currentMonthWeekDayStart;
  currentMonthDaysArray;
  selectedDay;
  selectedMonth;
  displayType = 0; // 0: Calendar ; 1: Year Select; 2: Month Select
  calendarType = "ranges";
  ranges = [{from:"10 Jul 2019", to:"15 Jul 2019", name:"Pedro Lopes", id:""}, {from:"20 Jul 2019", to:"25 Jul 2019", name:"Johnny Lopes", id:""},{from:"25 Jul 2019", to:"29 Jul 2019", name:"Johnny Lopes", id:""},{from:"31 Jul 2019", to:"05 Aug 2019", name:"Johnny Lopes", id:""},{from:"25 Dec 2019", to:"15 Jan 2020", name:"Johnny Lopes", id:""},{from:"25 Nov 2019", to:"15 Dec 2019", name:"Johnny Lopes", id:""}];

  constructor() { }

  ngOnInit() {
    this.displayDate = new Date();
    this.currentDate = new Date();
    this.currentDate.setHours(0,0,0,0);
    this.calculateCalendar();
  }

  calculateCalendar(){
    this.currentMonth = new Date(this.displayDate).getUTCMonth();
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
    this.displayDate = new Date(this.displayDate.setMonth(this.displayDate.getMonth()+1));
    this.calculateCalendar();
  }

  previousMonth(){
    this.displayDate = new Date(this.displayDate.setMonth(this.displayDate.getMonth()-1));
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

  getDayColor(day, month, year):string{
    let returnValue;
    var BreakException = {};

    if(this.ranges && this.calendarType === "ranges" && day > 0){
      this.ranges.forEach((range) => {
        try{
          let tileDate = new Date(day+' '+this.monthNames[month]+' '+year);
          let rangeDateFrom = new Date(range.from);
          let rangeDateTo = new Date(range.to);
          let rangeFromDay = new Date(range.from).getUTCDate()+1;
          let rangeFromMonth = new Date(range.from).getUTCMonth()+1;
          let rangeFromYear = new Date(range.from).getFullYear();
          let rangeToDay = new Date(range.to).getUTCDate()+1;
          let rangeToMonth = new Date(range.to).getUTCMonth()+1;
          let rangeToYear = new Date(range.to).getFullYear();

          // Current Date
          if(tileDate.toUTCString() === this.currentDate.toUTCString()){
            returnValue = "current_date";
            throw BreakException;
          }

          // Start of range
          if(tileDate.toUTCString() === rangeDateFrom.toUTCString()){
            returnValue = "start_range";
            throw BreakException;
          }

          // Inside range
          if(tileDate > rangeDateFrom && tileDate < rangeDateTo){
            returnValue = "mid_range";
            throw BreakException;
          }
          
          // End of Range
          if(tileDate.toUTCString() === rangeDateTo.toUTCString()){
            returnValue = "end_range";
            throw BreakException;
          }

        } catch (e) {
          if (e !== BreakException) throw e;
        }
      });
    }
    return returnValue;
  }
  
  setStyles(day, month, year) {
    
    let dayColorType = this.getDayColor(day, month, year);

    let styles = {
      'background-color': dayColorType === 'start_range' || dayColorType === 'end_range' ? '#ff5a5f' 
        : dayColorType === 'mid_range' ? '#E39695' 
        : dayColorType === 'current_date' ? '#D2D0BA'
        : '',
    };
    return styles;
  }
}