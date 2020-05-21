import { Component, OnInit, Input } from '@angular/core';
import * as AppConst from '../../app.const';

@Component({
  selector: 'app-sidebar-offers',
  templateUrl: './sidebar-offers.component.html',
  styleUrls: ['./sidebar-offers.component.scss']
})
export class SidebarOffersComponent implements OnInit {
  @Input('offers') offers: any;
  oldWebsiteURL: any = AppConst.oldWebsiteURL;
  
  constructor() { }

  ngOnInit() {
    
  }
  encodeURIComponent(str){
    return encodeURI(str);
  }
}
