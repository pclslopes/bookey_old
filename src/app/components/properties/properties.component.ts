import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router, RouteReuseStrategy } from '@angular/router';
import { AuthParseService } from '../../services/auth.parse.service';
import { PropertyService } from '../../services/property.service';
import { PropertyModel } from '../../models/property.model';
import { MatSort } from "@angular/material";
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit {

  displayedColumns: string[] = [ 'propertyName' ];
  dataSource;
  limit:number = environment.listItemsPerPage;
  currentPage;
  currentCount;
  myData;
  isLastPage = false;
  isLoading = true;

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
    this.propertyService.getProperties(page).then(data => {
      this.isLoading = false;
      this.currentPage = page;
      this.currentCount = Object.keys(data).length;
      this.myData = data;
      this.dataSource = data;
      if(this.currentCount < environment.listItemsPerPage){
        this.isLastPage = true;
      }else{
        this.isLastPage = false;
      }
    });
  }
}