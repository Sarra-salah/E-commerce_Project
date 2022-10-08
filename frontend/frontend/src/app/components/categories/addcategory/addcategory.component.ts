import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent implements OnInit {
  submitted=false;
  form!:FormGroup;
  productForm:any

  constructor(private formBuilder:FormBuilder,private categoryservice:CategoryService, private route:Router) { }

    ngOnInit(): void {
      this.form=this.formBuilder.group({
        name:['',Validators.required],
        description:['',Validators.required],
      })
    }
    get f(){
      return this.form.controls;
    }

    onSubmit():void{



      this.submitted=true;
      console.log(this.form.value)
      this.categoryservice.addcategory(this.form.value).subscribe((res:any)=>{
        if(res.message=="success"){
          Swal.fire(
            'Category created successfully!',

          )

          this.route.navigateByUrl("/category")
        }else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: res.message=="fail" ? 'fail to create category' : 'Category already exist',
          })

        }
       })
      //console.log(JSON.stringify(this.form.value, null, 2))
    }
    onReset():void{
      this.submitted=false;
      this.form.reset();
    }


  }

