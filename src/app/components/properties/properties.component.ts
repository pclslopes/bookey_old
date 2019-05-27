import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthParseService } from '../../services/auth.parse.service';
import { PropertyService } from '../../services/property.service';
import { PropertyModel } from '../../models/property.model';
import { PropertyModels } from '../../models/property.model';
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit {

  displayedColumns: string[] = [ 'propertyName', 'propertyLink'];
  dataSource: PropertyModels;

  constructor(public authService: AuthParseService,
      private route: ActivatedRoute,
      private propertyService: PropertyService,
      public router: Router) { }

  ngOnInit() {
    //this.dataSource = new MatTableDataSource();

    this.propertyService.getProperties().then(data => {
      console.log("test");
      console.log("promise result: "+JSON.stringify(data));

      this.dataSource = data;
    });
    console.log('I will not wait until promise is resolved');
  }

  private newProperty(){
    this.router.navigate(['new-property']);
  }

  navProperty(row){
    console.log("click: "+JSON.stringify(row));
    this.router.navigate(['new-property'], row);
  }
}