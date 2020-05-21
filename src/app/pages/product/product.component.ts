import { Component, OnInit, Input } from '@angular/core';
import * as AppConst from '../../app.const';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common.service';
import { CommonFunctionService } from 'src/app/services/common-function.service';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
    products: any;
    @Input('listingType') listingType: any;
    @Input('blogPosts') blogPosts: any;
    currencyIcon:any = AppConst.currencyIcon;
    commingUpToolTipText:any = AppConst.commingUpToolTipText;

    pageLimit: any = 10;
    collectionSize:any;
    BlockIndex: any = 0;
    dateFormat:any=AppConst.dateFormat;
    currentDate:any =  new Date();
    previousDate :any = new Date();
    constructor(
        private toast: ToastrService,
        private service: CommonService,
        public commonFunctions: CommonFunctionService
    ) { }

    ngOnInit() {
        this.fnShowPage(1);
        this.previousDate.setDate(this.currentDate.getDate() - 1);
    }

    fnShowPage(page) {
        this.service.get('Home/FrontPageProducts?type='+this.listingType+'&page=' + page + '&pageSize=' + this.pageLimit).then((response: any) => {
            if (response.Status && response.Status == 1) {
                if (response.Data) {
                    this.products = response.Data.Items;
                    this.pageLimit = response.Data.PageSize;
                    this.collectionSize = response.Data.TotalPages * this.pageLimit;
                    this.BlockIndex = Math.floor(Math.random() * 10);
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
        })
       
    }

    fnSetAlternateImg(product){
        product.showDefaultImg = true;
    }

    fnGoToProductDetailspage(product){
        var strCategory ="categories";
        
        if(product.ProductCategory.Category && product.ProductCategory.Category.CategoryName){
            strCategory =this.commonFunctions.UrlString(product.ProductCategory.Category.CategoryName);
        }

        var url = "product/" + product.ProductId  + "/" + strCategory+ "/"+this.commonFunctions.UrlString(product.Product.ProductName);
        this.commonFunctions.fnRedirectToOldWebsiteUrl(url);
    }
}
