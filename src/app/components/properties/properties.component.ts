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

  properties: any;
  displayedColumns: string[] = [ 'PropertyName', 'PropertyLink'];

  constructor(public authService: AuthParseService,
      private route: ActivatedRoute,
      private propertyService: PropertyService,
      public router: Router) { }

  ngOnInit() {
 
    this.propertyService.getProperties2().then((res) => {
      console.log("replied");
      console.log("res: -->"+JSON.stringify(res)); // not called
      this.properties = res.map(item => {
        return {
          objectId: [...item].objectId,
          PropertyName: item.PropertyName,
          PropertyLink: item.PropertyLink
        } as PropertyModel
      });
      //Object.assign(new PropertyModel(), res)
      for (var c in res) {
        console.log(JSON.stringify(res[c]));
      }
      console.log("count: " + res.count);
      var arr_names:PropertyModel[] = new Array(res._count);
      Array.from(Object.keys(res)).forEach(function(key) {
        //this.arr_names.push(res[key]);
          console.log(key + ':--> ' + JSON.stringify(res[key]));
          console.log(key + ':--> ' + JSON.stringify(res[key].PropertyName));

          
      });
      
      

      console.log("final obj2: "+JSON.stringify(this.properties));
    });
  }

  private newProperty(){
    this.router.navigate(['new-property']);
  }

  navProperty(){

  }
}