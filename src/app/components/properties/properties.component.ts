import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthParseService } from '../../services/auth.parse.service';
import { PropertyService } from '../../services/property.service';
import { PropertyModel } from '../../models/property.model';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit {

  properties: PropertyModel[];
  displayedColumns: string[] = [ 'PropertyName', 'PropertyLink'];

  constructor(public authService: AuthParseService,
      private route: ActivatedRoute,
      private propertyService: PropertyService,
      public router: Router) { }

  ngOnInit() {
  //  this.propertyService.getBookings().subscribe(data => {
   //   this.properties = data.map(e => {
   //     return {
   //       objectId: e.payload.doc.id,
   //       PropertyName:  e.payload.doc.data().PropertyName,
   //       PropertyLink:  e.payload.doc.data().PropertyLink
   //     } as PropertyModel;
  //    })
  //  });

//    .map(res => { 
//        return res.json().results.map(item => { 
 //         return new SearchItem( (4)
 //             item.trackName,
  ////////            item.artistName,
//              item.trackViewUrl,
 //             item.artworkUrl30,
  //            item.artistId
   //       );
    //    });
     // });
      this.propertyService.getProperties().then(results => {
        this.properties = results.map(e => {
          return new PropertyModel {
            objectId: e.objectId,
            PropertyName: e.PropertyName,
            PropertyLink: e.PropertyLink
          }
        })
      });
  }

  private newProperty(){
    this.router.navigate(['new-property']);
  }
}