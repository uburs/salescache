import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { ToastrService } from 'ngx-toastr';
import * as AppConst from '../../app.const';
import { CommonFunctionService } from '../../services/common-function.service'

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    banners: any = [];
    categories: any = [];
    sliderImages: any = [];
    offers: any = [];
    blogPosts: any = [];
    CurrentYear: number = new Date().getFullYear();

    currencyIcon: any = AppConst.currencyIcon;
    oldWebsiteURL: any = AppConst.oldWebsiteURL;
    blogsURL: any = AppConst.blogsURL;
    recentBlogsURL: any = AppConst.recentBlogsURL;
    commingUpToolTipText:any = AppConst.commingUpToolTipText;

    isShowAmazonDiscounted = false;
    isInToggle = false;

    selectedTab:string= 'todaysPicks';
    listingTypeTP: String = 'PICKS';
    listingTypeFP: String = 'FEATURED';
    listingTypeRP: String = 'RECENT';

    constructor(private service: CommonService,
        private toast: ToastrService,
        public commonFunctions: CommonFunctionService) {
    }

    ngOnInit() {
        this.fnLoadCategories();
        this.fnLoadBanners();
        this.fnGetSliders();
        this.fnGetCurrentOffers();
        this.fnGetPostBlogFeed();
     }

     fnOnClickMenuToggle(){
         console.log(this.isInToggle);
        this.isInToggle=!this.isInToggle;
     }

    fnLoadCategoryData(category) {
        console.log(this.commonFunctions.UrlString(category.CategoryName));
        var url = this.oldWebsiteURL + 'Categories/' + this.commonFunctions.UrlString(category.CategoryName);
        window.open(url, AppConst.windowOpenTarget);
    }


    fnSetAlternateImg(offer) {
        offer.Client.Img = offer.ImgPath;
    }

    fnGetSliders(){
        this.service.get('Home/GetSliderImages').then((response: any) => {
            if (response.Status && response.Status == 1) {
                if (response.Data.HomeSliderImages) {
                    this.sliderImages = response.Data.HomeSliderImages;
                }
            }
            else {
                if (response.Message) {
                    this.toast.error(response.Message);
                }
                else {
                    this.toast.error('Something happened wrong, please try again after sometime.');
                }
            }
        });
    }

    //this function relies on the service exported in common-services.ts
    //it's just angular's way of adding services so i guess angular searches for CommonServices and attaches that to the "this" scope 
    fnGetCurrentOffers(){
        this.service.getLambda(lambdaOffersURL).then((response: any) => {
            if (response.Status && response.Status == 1) {
                if (response.Data) {
                    this.offers = response.Data;
                }
            }
            else {
                if (response.Message) {
                    this.toast.error(response.Message);
                }
                else {
                    this.toast.error('Something happened wrong, please try again after sometime.');
                }
            }
        });
    }

    fnLoadBanners() {
        this.service.get('Home/GetBanners').then((response: any) => {
            if (response.Status && response.Status == 1) {
                if (response.Data) {
                    this.banners = response.Data;
                }
            }
            else {
                if (response.Message) {
                    this.toast.error(response.Message);
                }
                else {
                    this.toast.error('Something happened wrong, please try again after sometime.');
                }
            }
        });
    }

    fnLoadCategories() {
        this.service.get('Home/GetCategories').then((response: any) => {
            if (response.Status && response.Status == 1) {
                if (response.Data && response.Data.Categories) {
                    this.categories = response.Data.Categories
                }
            }
            else {
                if (response.Message) {
                    this.toast.error(response.Message);
                }
                else {
                    this.toast.error('Something happened wrong, please try again after sometime.');
                }
            }
        });
    }

    fnGetPostBlogFeed(){
        // this.service.getPostFeeds(this.recentBlogsURL).then((response: any) => {
        //     const responsetest = new DOMParser().parseFromString(response, "text/xml");
        //     this.blogPosts = [];
        //     for (var i = 1; i <= 3; i++) {
        //         this.blogPosts[i - 1] = this.getBlogPostsProps(responsetest, i);
        //     }
        // });
    }

    getBlogPostsProps(response, i) {
        const nsResolver = response.createNSResolver(response.ownerDocument == null ? response.documentElement : response.ownerDocument.documentElement);
        const url = response.evaluate('//item[' + i + ']/link', response, nsResolver, XPathResult.STRING_TYPE, null).stringValue;
        const title = response.evaluate('//item[' + i + ']/title', response, nsResolver, XPathResult.STRING_TYPE, null).stringValue;
        const imageNodeString = response.evaluate('//item[' + i + ']/description/node()', response, nsResolver, XPathResult.STRING_TYPE, null).stringValue
        const imageNode = new DOMParser().parseFromString(imageNodeString, "text/xml");
        const image = imageNode.evaluate('//div/img/@src', imageNode, nsResolver, XPathResult.STRING_TYPE, null).stringValue

        console.log('image' + image);

        const post = {
            title: title,
            url: url,
            image: image
        }
        return post
    }

}