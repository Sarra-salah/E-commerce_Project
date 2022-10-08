import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
users:any;
i:any;
filtredUsers: any |undefined;
searchName=''
searchNumber=''
searchEmail=''

  constructor(private userservice:UserService) { }

  ngOnInit(): void {
   this.getALLUsers()
   this.applyFilter()
  }
  getALLUsers(){
    this.userservice.getUsers().subscribe((res: any)=>{
      this.users=res["data"]
      this.filtredUsers=this.users
      console.log("list users",this.users)
    })
  }
  deleteUser(id:any){

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userservice.deleteUsers(id).subscribe((res:any)=>
       { console.log(res)
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      this.getALLUsers()})
      }
    })

  }
  applyFilter(){
    if(this.users!=undefined){
this.filtredUsers=this.users.filter((user:any)=>{
  if(this.searchName!=''){
    return user.firstname.toLowerCase().includes(this.searchName.toLowerCase()) ||user.lastname.toLowerCase().includes(this.searchName.toLowerCase())
  }
 if (this.searchEmail!=''){
      return user.email.toLowerCase().includes(this.searchEmail.toLowerCase())
  }
if(this.searchNumber!=''){
      return user.tel.toLowerCase().includes(this.searchNumber.toLowerCase())
 }
 else {
  return this.users
}

})
  }

  }
}


