import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthParseService } from '../../services/auth.parse.service';
import { PropertyService } from '../../services/property.service';
import { PropertyModel } from '../../models/property.model';
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit {

  //dataSource: any; // = new PropertyDataSource(this.propertyService);;
  displayedColumns: string[] = [ 'PropertyName', 'PropertyLink'];
  dataSource: MatTableDataSource<PropertyModel[]>;

  constructor(public authService: AuthParseService,
      private route: ActivatedRoute,
      private propertyService: PropertyService,
      public router: Router) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();


    //this.dataSource = this.propertyService.properties; // subscribe to entire collection
    //this.propertyService.getProperties();
this.getLaps();
    //console.log("DataSource: --> " + JSON.stringify(this.dataSource));
    //console.log("Properties: --> " + JSON.stringify(this.propertyService.properties));
  }

getLaps() {
     this.propertyService.getProperties().subscribe((data: {}) => {
       console.log(data);
       console.log('Laps');
       this.dataSource.data = data; // on data receive populate dataSource.data array
       return data;
    });
}
  private newProperty(){
    this.router.navigate(['new-property']);
  }

  navProperty(){

  }
}