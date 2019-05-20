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
      //alert(JSON.stringify());
  this.propertyService.getProperties2().then((res) => {
      console.log("replied");
      console.log(JSON.stringify(res)); // not called
      //this.properties = res.map(item => new PropertyModel(item));
      //Object.assign(new PropertyModel(), res)
      this.properties = res.map(e => {
        return {
            objectId: e.objectId,
            PropertyName: e.PropertyName,
            PropertyLink: e.PropertyLink
        } as PropertyModel;
      });
      
      console.log("final obj: "+JSON.stringify(Object.assign(new PropertyModel(), res)));
      console.log("final obj2: "+JSON.stringify(this.properties));
    })
    .catch((err) => {
        console.log(err.message);
    })
  }

  private newProperty(){
    this.router.navigate(['new-property']);
  }

  navProperty(){

  }
}