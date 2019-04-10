import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenavlist',
  templateUrl: './sidenavlist.component.html',
  styleUrls: ['./sidenavlist.component.css']
})
export class SidenavlistComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onToggleClose(){
    this.closeSideNavigation.emit();
  }
}