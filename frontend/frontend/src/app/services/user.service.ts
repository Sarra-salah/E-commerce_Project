import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) {}


  getUsers(){
    return this.http.get(`${environment.baseUrl}/users/getall`)
  }
  deleteUsers(id:any){
    return this.http.delete(`${environment.baseUrl}/users/delete/${id}`)
  }
  getUserbyid(id:any){
    return this.http.get(`${environment.baseUrl}/users/getbyid/${id}`)
  }
  registerUsers(users:any){
    return this.http.post(`${environment.baseUrl}/users/register`,users)

  }
  updateUser(id:any,user:any){
    return this.http.put(`${environment.baseUrl}/users/update/${id}`,user)
  }
}
