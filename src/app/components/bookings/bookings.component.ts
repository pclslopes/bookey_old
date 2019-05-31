import { Component, OnInit } from '@angular/core';
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

  displayedColumns: string[] = [ 'customerName', 'checkinDate', 'checkoutDate', 'propertyName'];
  dataSource: BookingModel[];

  constructor(
      public authService: AuthParseService,
      private route: ActivatedRoute,
      private bookingService: BookingsService,
      public router: Router) { }

  ngOnInit() {
    this.bookingService.getBookings().then(data => {
      console.log("promise result: "+JSON.stringify(data));
      this.dataSource = data;
    });
    console.log('I will not wait until promise is resolved');
  }

  private newBooking(){
    this.router.navigate(['new-booking']);
  }
}