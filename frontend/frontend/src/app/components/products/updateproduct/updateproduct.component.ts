import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ProductServiceService } from 'src/app/services/product-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-updateproduct',
  templateUrl: './updateproduct.component.html',
  styleUrls: ['./updateproduct.component.css']
})
export class UpdateproductComponent implements OnInit {

 
  submitted = false;
  form!:FormGroup;
  id=this.activeroute.snapshot.params["id"]
  product:any

constructor(private activeroute : ActivatedRoute,private ProductService:ProductServiceService,private categoryservice:CategoryService, private formBuilder:FormBuilder, private route:Router) { }

listcategory:any
p:any
 ngOnInit(): void {
  this.getallcategories()
  this.getproductbyid()
  this.form = this.formBuilder.group(
    {
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required],
      category: ['', Validators.required],

    })


 }

 getproductbyid() {
 this.ProductService.getProductbyid(this.id).subscribe((res:any)=>{
   this.product =res["data"]
   this.form.patchValue({
    name:res["data"].name,
    description:res["data"].description,
    price:res["data"].price,
    stock:res["data"].stock,
    category:res["data"].category
   })
   console.log("detail product",this.product)
   })
   }

   
   updateproduct() {
    this.ProductService.updateproduct(this.id,this.form.value).subscribe((res:any) =>{
      console.log(res)
      Swal.fire("product updated !!")
      this.route.navigateByUrl("/product")
    })
   }
   getallcategories(){
    this.categoryservice.getcategory().subscribe((res:any)=>{
      this.listcategory=res['data']
      console.log("list categories", this.listcategory)

    })
  }

}
