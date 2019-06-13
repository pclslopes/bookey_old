import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material';
import { AuthParseService } from '../../services/auth.parse.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { CustomerModel } from '../../models/customer.model';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  @ViewChild(MatPaginatorModule, {static: false}) paginator: MatPaginatorModule;
  displayedColumns: string[] = [ 'name', 'country', 'email', 'phone'];
  dataSource;

  constructor(public authService: AuthParseService,
      private route: ActivatedRoute,
      private customerService: CustomerService,
      public router: Router) { }

  ngOnInit() {
    this.customerService.getCustomers().then(data => {
      console.log("promise result: "+JSON.stringify(data));
      //this.dataSource = data;
      this.dataSource = new MatTableDataSource<any>(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  private newCustomer(){
    this.router.navigate(['new-customer']);
  }
  
  navCustomer(row){
    console.log("click: "+JSON.stringify(row));
    this.router.navigate(['new-customer', {id:row.id}]);
  }
}