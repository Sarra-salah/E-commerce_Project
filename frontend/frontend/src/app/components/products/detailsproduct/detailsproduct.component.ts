import { NgForOf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductServiceService } from 'src/app/services/product-service.service';

@Component({
  selector: 'app-detailsproduct',
  templateUrl: './detailsproduct.component.html',
  styleUrls: ['./detailsproduct.component.css']
})
export class DetailsproductComponent implements OnInit {
 

p:any;
product:any;
galleries:any ;
 id = this.activeroute.snapshot.params["id"];



constructor(private activeroute:ActivatedRoute,private productservice:ProductServiceService) { }

  ngOnInit(): void {
    console.log("id",this.id)

    this.getproductbyid()
    
  }
  getproductbyid(){
    this.productservice.getProductbyid(this.id).subscribe((res:any)=>{
      this.product=res["data"]
      console.log("detailproduct",this.product)
    })
    
  }
  getImage(name:string):string{
    
    if(name){
      console.log('../../../assets/img/storages/'+name)
    return  '../../../assets/img/storages/'+name
    

    }else{ return ''}
    
  }
 

}
