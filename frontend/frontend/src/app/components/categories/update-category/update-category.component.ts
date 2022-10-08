import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {
  id=this.activeroute.snapshot.params['id']
  category:any
  form!:FormGroup

  constructor(private activeroute:ActivatedRoute,private categoryservice :CategoryService,private FormBuilder:FormBuilder,private route:Router) { }

  ngOnInit(): void {
 this.getcategorybyid()
this.form=this.FormBuilder.group({
  name:['',Validators.required],
  description:['',Validators.required],

})
  }


getcategorybyid(){
  this.categoryservice.getcategorybyid(this.id).subscribe((res:any)=>{
    this.category =res["data"]
   this.form.patchValue({
    name:res["data"].name,
    description:res["data"].description
  })
  console.log("detail category")
})
}

updatecategory(){
  this.categoryservice.updatecategory(this.id,this.form.value).subscribe((res:any)=>{
    console.log(res)
    Swal.fire("category updated !!")
    this.route.navigateByUrl("/category")
  })
}








}
