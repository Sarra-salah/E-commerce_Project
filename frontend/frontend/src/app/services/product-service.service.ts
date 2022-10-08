import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private http:HttpClient) {}
    getproducts(){
      return this.http.get(`${environment.baseUrl}/products/getall`)
    }
    deleteProducts(id:any){
      return this.http.delete(`${environment.baseUrl}/products/delete/${id}`)
    }
    getProductbyid(id:any){
      return this.http.get(`${environment.baseUrl}/products/getone/${id}`)
    }
  addproduct(product:any){
    return this.http.post(`${environment.baseUrl}/products/create`,product)
  } 
  updateproduct(id:any,product:any){
    return this.http.put(`${environment.baseUrl}/products/update/${id}`,product)
  }
}
