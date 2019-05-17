import { Component, OnInit } from '@angular/core';
import { AuthParseService } from '../../services/auth.parse.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import { PropertyModel } from '../../models/property.model';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit {

  properties: PropertyModel[];
  displayedColumns: string[] = [ 'customerName', 'checkinDate', 'checkoutDate', 'propertyName'];

  constructor() { }

  ngOnInit() {
  }

}