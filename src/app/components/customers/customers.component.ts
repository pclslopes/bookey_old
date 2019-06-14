import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material';
import { AuthParseService } from '../../services/auth.parse.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { CustomerModel } from '../../models/customer.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  displayedColumns: string[] = [ 'name', 'country', 'email', 'phone'];
  dataSource;
  limit:number = environment.listItemsPerPage;
  currentPage = 0;
  currentCount = 0;
  isLastPage = false;

  constructor(
      public authService: AuthParseService,
      private route: ActivatedRoute,
      private customerService: CustomerService,
      public router: Router) { }

  ngOnInit() {
    this.getCustomers(this.currentPage);
  }

  private newCustomer(){
    this.router.navigate(['new-customer']);
  }
  
  navCustomer(row){
    console.log("click: "+JSON.stringify(row));
    this.router.navigate(['new-customer', {id:row.id}]);
  }

  nextPage(){
    if(this.currentCount >= environment.listItemsPerPage){
      this.currentPage++;
      this.getCustomers(this.currentPage);
    }
  }

  previousPage(){
    if(this.currentPage > 0){
      this.currentPage--;
      this.getCustomers(this.currentPage);
    }
  }

  getCustomers(page:number = 0){
    this.customerService.getCustomers(page).then(data => {
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