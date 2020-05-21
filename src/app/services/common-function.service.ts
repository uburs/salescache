import { Injectable } from '@angular/core';
import * as AppConst from '../app.const';

@Injectable({
  providedIn: 'root'
})
export class CommonFunctionService {

  constructor() { }

  fnRedirectToOldWebsiteUrl(url) {
    console.log(url.charAt(0))
    if (url.charAt(0) === '/') {
      url = url.substr(1);
    }
    window.open(AppConst.oldWebsiteURL + url, AppConst.windowOpenTarget);
  }

  fnRedirectToOffers() {
    var url = AppConst.oldWebsiteURL + 'Offers/index';
    window.open(url, AppConst.windowOpenTarget);
  }

  fnRedirectToBlog() {
    var url = AppConst.blogsURL;
    window.open(url, AppConst.windowOpenTarget);
  }

  encodeURIComponent(str) {
    return this.UrlString(str);
  }

  UrlString(str) {
    var reservedChars = "`!~#$%^*+=[]\\;,/{}|\":'.<>?@";
    var newstring = "";
    if (str != null) {
      for (var i of str) {
        if (" ".indexOf(i) > -1) {
          newstring += "-";
        }
        if ("&".indexOf(i) > -1) {
          newstring += "and";
        }
        if (reservedChars.indexOf(i) == -1 && i != ' ' && i != "&") {
          newstring += i;
        }
      }
    }
    return newstring;
  }

  redirectToUpcommingPage(){
    window.open(AppConst.commingUpToolTipUrlLink, AppConst.windowOpenTarget);
  }
}
