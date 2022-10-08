import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateuserComponent implements OnInit {

  submitted = false;
  form!:FormGroup;
  id=this.activeroute.snapshot.params["id"]
  user:any

constructor(private activeroute : ActivatedRoute,private userService:UserService, private formBuilder:FormBuilder, private route:Router) { }

p:any
 ngOnInit(): void {
  this.getuserbyid()
  this.form = this.formBuilder.group(
    {
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      isAdmin: ['', Validators.required],

    })


 }

 getuserbyid() {
 this.userService.getUserbyid(this.id).subscribe((res:any)=>{
   this.user =res["data"]
   this.form.patchValue({
    firstname:res["data"].firstname,
    lastname:res["data"].lastname,
    email:res["data"].email,
    password:res["data"].password,
    isAdmin:res["data"].isAdmin
   })
   console.log("detail user",this.user)
   })
   }

   
   updateuser() {
    this.userService.updateUser(this.id,this.form.value).subscribe((res:any) =>{
      console.log(res)
      Swal.fire("user updated !!")
      this.route.navigateByUrl("/user")
    })
   }
  
  }


