import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material';
import { AuthParseService } from '../../services/auth.parse.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingsService } from '../../services/bookings.service';
import { PropertyService } from '../../services/property.service';
import { BookingModel } from '../../models/booking.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {

  displayedColumns: string[] = [ 'customerName', 'checkinDate', 'checkoutDate', 'propertyName'];
  dataSource;
  limit:number = environment.listItemsPerPage;
  currentPage;
  currentCount;
  isLastPage = false;
  propertyCount = undefined;

  constructor(
      public authService: AuthParseService,
      private route: ActivatedRoute,
      private bookingService: BookingsService,
      private propertyService: PropertyService,
      public router: Router) { }

  ngOnInit() {
    this.propertyService.getPropertyCount().then((result) => {
      this.propertyCount = result;
      if(this.propertyCount > 0){
        this.getBookings(this.currentPage);
      }
    });
  }

  private newBooking(){
    this.router.navigate(['new-booking']);
  }
  
  navBooking(row){
    console.log("click: "+JSON.stringify(row));
    this.router.navigate(['new-booking', {id:row.id}]);
  }

  navNewProperty(){
    this.router.navigate(['new-property']);
  }

  nextPage(){
    if(this.currentCount >= environment.listItemsPerPage){
      this.currentPage++;
      this.getBookings(this.currentPage);
    }
  }

  previousPage(){
    if(this.currentPage > 0){
      this.currentPage--;
      this.getBookings(this.currentPage);
    }
  }

  getBookings(page:number = 0){
    this.bookingService.getBookings(page).then((data) => {
      this.currentPage = page;
      this.currentCount = Object.keys(data).length;
      this.dataSource = new MatTableDataSource<any>(data);
      if(this.currentCount < environment.listItemsPerPage){
        this.isLastPage = true;
      }else{
        this.isLastPage = false;
      }
    });
  }

}