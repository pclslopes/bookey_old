import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthParseService } from '../../services/auth.parse.service';
import { PropertyService } from '../../services/property.service';
import { PropertyModel } from '../../models/property.model';
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import 'rxjs/add/operator/toPromise';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit {

  displayedColumns: string[] = [ 'propertyName', 'propertyLink'];
  dataSource;
  limit:number = environment.listItemsPerPage;
  currentPage = 0;
  currentCount = 0;

  constructor(
      public authService: AuthParseService,
      private route: ActivatedRoute,
      private propertyService: PropertyService,
      public router: Router) { }

  ngOnInit() {
    this.getProperties(this.currentPage);
  }

  private newProperty(){
    this.router.navigate(['new-property']);
  }

  navProperty(row){
    console.log("click: "+JSON.stringify(row));
    this.router.navigate(['new-property', {id:row.id}]);
  }

  nextPage(){
    if(this.currentCount >= environment.listItemsPerPage){
      this.currentPage++;
      this.getProperties(this.currentPage);
    }
  }

  previousPage(){
    if(this.currentPage > 0){
      this.currentPage--;
      this.getProperties(this.currentPage);
    }
  }

  getProperties(page:number = 0){
    this.propertyService.getProperties().then(data => {
      console.log("promise result: "+JSON.stringify(data));
      if(Object.keys(data).length === 0 && this.currentPage > 0){
        this.currentPage--;
      }
      this.currentCount = Object.keys(data).length;
      this.dataSource = new MatTableDataSource<any>(data);
    });
  }
}