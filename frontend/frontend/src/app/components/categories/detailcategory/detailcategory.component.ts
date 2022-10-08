import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-detailcategory',
  templateUrl: './detailcategory.component.html',
  styleUrls: ['./detailcategory.component.css']
})
export class DetailcategoryComponent implements OnInit {

  p:any;
category:any;
 id = this.activeroute.snapshot.params["id"];



constructor(private activeroute:ActivatedRoute,private categoryservice:CategoryService) { }

  ngOnInit(): void {
    console.log("id",this.id)

    this.getcategorybyid()
    
  }
  getcategorybyid(){
    this.categoryservice.getcategorybyid(this.id).subscribe((res:any)=>{
      this.category=res["data"]
      console.log("detailcategory",this.category)
    })
    
  }

}
