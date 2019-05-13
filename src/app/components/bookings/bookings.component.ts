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

  bookings: BookingModel[];
  displayedColumns: string[] = [ 'customerName', 'checkinDate', 'checkoutDate', 'propertyName'];

  constructor(
      public authService: AuthParseService,
      private route: ActivatedRoute,
      private bookingService: BookingsService,
      public router: Router) { }

  ngOnInit() {
    this.bookingService.getBookings().subscribe(data => {
      this.bookings = data.map(e => {
        return {
          id: e.payload.doc.id,
          propertyId:  e.payload.doc.data().propertyId,
          propertyName: e.payload.doc.data().propertyName,
          checkinDate: e.payload.doc.data().checkinDate,
          checkoutDate: e.payload.doc.data().checkoutDate,
          customerId: e.payload.doc.data().customerId,
          customerName: e.payload.doc.data().customerName,
        } as BookingModel;
      })
    });
  }

  private newBooking(){
    this.router.navigate(['new-booking']);
  }
}