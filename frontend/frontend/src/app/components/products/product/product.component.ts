import { category } from './../../../models/category.model';
import { CategoryService } from './../../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from 'src/app/services/product-service.service';
import Swal from 'sweetalert2';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: any |undefined;
  filtredProducts: any |undefined;
  categories:category[] | undefined;
  searchText = ''
  searchCategory= new FormControl('');
  p:number=1


  constructor(private productservice:ProductServiceService , private categoryservice : CategoryService) { }

  ngOnInit(): void {
    this.searchCategory.setValue('all')
    this.getALLProducts();
    this.getAllcategories()
  }
  getALLProducts(): void{
    this.productservice.getproducts().subscribe((res: any)=>{
      this.products=res["data"]
      this.filtredProducts = this.products
      console.log("list products",this.products)
    })

  }
  getAllcategories(){
    this.categoryservice.getcategory().subscribe((res:any)=>{
      this.categories=res.data
      console.log("list categories",this.categories)
    })
  }
  deleteProduct(id:any){

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
        this.productservice.deleteProducts(id).subscribe((res:any)=>
       { console.log(res)
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      this.getALLProducts()})
      }
    })

  }

  applyFilter()
  {
   this.filtredProducts = this.products.filter( (product: any) => {
    if (this.searchCategory.value=='all'){
      if (this.searchText!='')
             return product.name.toLowerCase().includes(this.searchText.toLowerCase())

      else {
        return true
      }
    }else{
      if (this.searchText!='')
      return product.name.toLowerCase().includes(this.searchText.toLowerCase()) && product.category==this.searchCategory.value;
      else {
        return product.category==this.searchCategory.value
      }
       
    }
    })
  }
}
