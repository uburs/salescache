import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'; 
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';

import { OwlModule } from 'ngx-owl-carousel';
import { ProductComponent } from './pages/product/product.component';
import { SidebarOffersComponent } from './pages/sidebar-offers/sidebar-offers.component';

import { RecentBlogsComponent } from './pages/recent-blogs/recent-blogs.component';

import { NgxHmCarouselModule } from 'ngx-hm-carousel';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ProductComponent,
        SidebarOffersComponent,
        RecentBlogsComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
        HttpClientModule,
        ToastrModule.forRoot(),
        OwlModule,
        NgbModule,
        NgxHmCarouselModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
