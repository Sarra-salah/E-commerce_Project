import { Component, OnInit } from '@angular/core';
import {  FormBuilder,  Validators } from '@angular/forms';
import {   FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import Validation from 'helper/match';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
 /* fileToUpload:Array<File>=[];*/
  submitted = false;
  registerform !:FormGroup;//creation d'un formulaire
  constructor(private formBuilder: FormBuilder, private userservice:UserService ) {}
  ngOnInit(): void {
    this.registerform = this.formBuilder.group(
      {
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        tel: ['', Validators.required],
        isAdmin: ['false', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
        confirmPassword: ['', Validators.required],
        acceptTerms: [false, Validators.requiredTrue]
      },
      {
        validators: [Validation.match('password', 'confirmPassword')]
      }
    );
  }
//convenience getter for easy access to form fields

/*handleFileInput(files:any){
  this.fileToUpload=<Array<File>>files.target.files;
  console.log(this.fileToUpload)
}*/
registre(): void {
  this.submitted = true;

  
let formdata = new FormData() ;
formdata.append("firstname", this.registerform.value.firstname);
formdata.append("lastname",this.registerform.value.lastname);
formdata.append("tel",this.registerform.value.tel);
formdata.append("isAdmin",this.registerform.value.isAdmin);
formdata.append("password",this.registerform.value.password);
/*formdata.append("photo",this.fileToUpload[0])*/
//formdata.append("id_provider",this.form.value.id_category)
//display form values on success
this.userservice.registerUsers(formdata).subscribe((res:any)=>{
  console.log(res)
 })
 console.log(JSON.stringify(this.registerform.value, null, 2))
}
onReset(): void {
 this.submitted = false;
 this.registerform.reset();
}
get myForm() {
  return this.registerform.get('isAdmin');
}
}
 


