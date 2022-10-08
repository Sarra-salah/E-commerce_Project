import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }
getcategory(){
  return this.http.get(`${environment.baseUrl}/categories/getall`)
}
deletecategory(id:any){
  return this.http.delete(`${environment.baseUrl}/categories/delete/${id}`)
}
getcategorybyid(id:any){
return this.http.get(`${environment.baseUrl}/categories/getbyid/${id}`)
}
addcategory(category:any){
  return this.http.post(`${environment.baseUrl}/categories/create`,category)
}
updatecategory(id:any,category:any){
return this.http.put(`${environment.baseUrl}/categories/update/${id}`,category)
}
}
