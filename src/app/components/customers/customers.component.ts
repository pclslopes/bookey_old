import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material';
import { AuthParseService } from '../../services/auth.parse.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { PropertyService } from '../../services/property.service';
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
  currentPage;
  currentCount;
  isLastPage = false;
  propertyCount = undefined;
  isLoading = true;

  constructor(
      public authService: AuthParseService,
      private route: ActivatedRoute,
      private customerService: CustomerService,
      private propertyService: PropertyService,
      public router: Router) { }

  ngOnInit() {
    this.propertyService.getPropertyCount().then((result) => {
      this.propertyCount = result;
      if(this.propertyCount > 0){
        this.getCustomers(this.currentPage);
      }
    });
  }

  private newCustomer(){
    this.router.navigate(['new-customer']);
  }
  
  navCustomer(row){
    console.log("click: "+JSON.stringify(row));
    this.router.navigate(['new-customer', {id:row.id}]);
  }

  navNewProperty(){
    this.router.navigate(['new-property']);
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
      this.isLoading = false;
      this.currentPage = page;
      this.currentCount = Object.keys(data).length;
      this.dataSource = data;
      if(this.currentCount < environment.listItemsPerPage){
        this.isLastPage = true;
      }else{
        this.isLastPage = false;
      }
    });
  }
}