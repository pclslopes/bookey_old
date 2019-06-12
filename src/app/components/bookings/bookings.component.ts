import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthParseService } from '../../services/auth.parse.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingsService } from '../../services/bookings.service';
import { BookingModel } from '../../models/booking.model';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {

  @ViewChild(MatPaginatorModule, {static: false}) paginator: MatPaginatorModule;
  displayedColumns: string[] = [ 'customerName', 'checkinDate', 'checkoutDate', 'propertyName'];
  dataSource;

  constructor(
      public authService: AuthParseService,
      private route: ActivatedRoute,
      private bookingService: BookingsService,
      public router: Router) { }

  ngOnInit() {


    this.bookingService.getBookings().then(data => {
      console.log("promise result: "+JSON.stringify(data));
      //this.dataSource = data;
      this.dataSource = new MatTableDataSource<any>(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  private newBooking(){
    this.router.navigate(['new-booking']);
  }
  
  navBooking(row){
    console.log("click: "+JSON.stringify(row));
    this.router.navigate(['new-booking', {id:row.id}]);
  }
}