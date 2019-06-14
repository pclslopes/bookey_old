import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material';
import { AuthParseService } from '../../services/auth.parse.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingsService } from '../../services/bookings.service';
import { BookingModel } from '../../models/booking.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {

  @ViewChild(MatPaginatorModule, {static: false}) paginator: MatPaginatorModule;
  displayedColumns: string[] = [ 'customerName', 'checkinDate', 'checkoutDate', 'propertyName'];
  dataSource;
  limit:number = environment.listItemsPerPage;
  currentPage = 0;
  currentCount = 0;

  constructor(
      public authService: AuthParseService,
      private route: ActivatedRoute,
      private bookingService: BookingsService,
      public router: Router) { }

  ngOnInit() {
    this.getBookings(this.currentPage);
  }

  private newBooking(){
    this.router.navigate(['new-booking']);
  }
  
  navBooking(row){
    console.log("click: "+JSON.stringify(row));
    this.router.navigate(['new-booking', {id:row.id}]);
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
      console.log("promise result: "+JSON.stringify(data));
      
      this.currentCount = Object.keys(data).length;
      this.dataSource = new MatTableDataSource<any>(data);
      this.dataSource.paginator = this.paginator;
    });
  }

}