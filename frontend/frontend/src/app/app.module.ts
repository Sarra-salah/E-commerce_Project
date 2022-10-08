import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductComponent } from './components/products/product/product.component';
import { DetailsproductComponent } from './components/products/detailsproduct/detailsproduct.component';
import { UpdateproductComponent } from './components/products/updateproduct/updateproduct.component';
import { UserComponent } from './components/users/user/user.component';
import { AddProductComponent } from './components/products/add-product/add-product.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdduserComponent } from './components/users/adduser/adduser.component';
import { UpdateuserComponent } from './components/users/updateuser/updateuser.component';
import { CategoryComponent } from './components/categories/category/category.component';
import { DetailcategoryComponent } from './components/categories/detailcategory/detailcategory.component';
import { AddcategoryComponent } from './components/categories/addcategory/addcategory.component';
import { UpdateCategoryComponent } from './components/categories/update-category/update-category.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HomeComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    ProductComponent,
    UpdateproductComponent,
    DetailsproductComponent,
    UserComponent,
    AddProductComponent,
    AdduserComponent,
    UpdateuserComponent,
    CategoryComponent,
    DetailcategoryComponent,
    AddcategoryComponent,
    UpdateCategoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
     ReactiveFormsModule,
     NgxPaginationModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
