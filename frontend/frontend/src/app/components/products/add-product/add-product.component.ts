import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ProductServiceService } from 'src/app/services/product-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
listcategory:any;
submitted=false;
form!:FormGroup;
myFiles:string[]=[]
productForm:any
constructor(private formBuilder:FormBuilder,private categoryservice:CategoryService, private productService:ProductServiceService, private route:Router) { }

  ngOnInit(): void {
    this.getallcategories()
    this.form=this.formBuilder.group({
      name:['',Validators.required],
      description:['',Validators.required],
      price:['',Validators.required],
      stock:['',Validators.required],

      category:['',Validators.required]
    })
  }
  get f(){
    return this.form.controls;
  }
 /* onFilechange(event: any){ //**methode ** push les images 
for (var i=0;i<event.target.files.length;i++){
  this.myFiles.push(event.target.files[i])
}
  }*/
  onSubmit():void{
    let formdata=new FormData()
    formdata.append("name",this.form.value.name);
    formdata.append("description",this.form.value.description);
    formdata.append("price",this.form.value.price);
    formdata.append("stock",this.form.value.stock);
    formdata.append("category",this.form.value.category);
    Swal.fire("success!!")
    this.route.navigateByUrl("/product")


    for (var i=0;i<this.myFiles.length;i++){
      formdata.append("photos",this.myFiles[i]);
    }
    this.submitted=true;
    this.productService.addproduct(formdata).subscribe((res:any)=>{
      console.log(res)
     }) 
    console.log(JSON.stringify(this.form.value, null, 2)) 
  }
  onReset():void{
    this.submitted=false;
    this.form.reset();
  }
  getallcategories(){
    this.categoryservice.getcategory().subscribe((res:any)=>{
      this.listcategory=res['data']
      console.log("list categories", this.listcategory)

    })
  }
}
