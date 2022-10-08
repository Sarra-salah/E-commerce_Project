import { category } from './../../../models/category.model';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor( private categorysevice:CategoryService) { }
  listcategory:any
  p:any;
  filtredcategory:any;
  searchText=''
  ngOnInit(): void {
    this.getAllCategory()
    this.applyFilter()
    }
    getAllCategory(){
      this.categorysevice.getcategory().subscribe((res:any)=>{
        this.listcategory=res["data"]
        this.filtredcategory=this.listcategory
        console.log("list category",this.listcategory)
      })
    }
    applyFilter(){
      if (this.listcategory != undefined){
        this.filtredcategory=this.listcategory.filter((category:any)=>{
          return category.name.toLowerCase().includes(this.searchText.toLowerCase())
         })
      }

    }

    deleteCategory(id :any){
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
          this.categorysevice.deletecategory(id).subscribe((res:any)=>{
          if(res.message=="success"){
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          this.getAllCategory()

          }else{
            Swal.fire({
              icon: 'error',
              title: 'category cannot be deleted',
              text: res.message=="fail" ? 'fail to create category' : 'category related to products'
            })

          }})

        }
      })
    }
    }
