import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './components/products/add-product/add-product.component';
import { AddcategoryComponent } from './components/categories/addcategory/addcategory.component';
import { AdduserComponent } from './components/users/adduser/adduser.component';
import { CategoryComponent } from './components/categories/category/category.component';
import { DetailcategoryComponent } from './components/categories/detailcategory/detailcategory.component';
import { DetailsproductComponent } from './components/products/detailsproduct/detailsproduct.component';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ProductComponent } from './components/products/product/product.component';
import { UpdateproductComponent } from './components/products/updateproduct/updateproduct.component';
import { UpdateuserComponent } from './components/users/updateuser/updateuser.component';
import { UserComponent } from './components/users/user/user.component';
import { UpdateCategoryComponent } from './components/categories/update-category/update-category.component';
const routes: Routes = [
  {path:"",component:LayoutComponent},
  {path:'home',component:HomeComponent},
  {path:"product",component:ProductComponent},
  {path:"detailsproduct/:id",component:DetailsproductComponent},
   {path:"user",component:UserComponent},
   {path:"addproduct",component:AddProductComponent},
   {path:"adduser",component:AdduserComponent},
   {path:"updateproduct/:id",component:UpdateproductComponent},
   {path:"updateuser/:id",component:UpdateuserComponent},
   {path:"category",component:CategoryComponent},
   {path:"detailcategory/:id",component:DetailcategoryComponent},
   {path:"addcategory",component:AddcategoryComponent},
   {path:"updatecategory/:id",component:UpdateCategoryComponent}

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
