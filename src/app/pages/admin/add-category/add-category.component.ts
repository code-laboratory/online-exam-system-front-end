import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  category ={
    title:'',
    description:''
  };
  constructor(private _category:CategoryService , private _snack:MatSnackBar,private router:Router) { }

  ngOnInit(): void {
  }

  formSubmit(){
    if(this.category.title.trim()== '' || this.category.description == null){
      this._snack.open("Title Requierd !!","",{
        duration:3000,
      })
      return;
    }
    if(this.category.description.trim()== '' || this.category.description == null){
      this._snack.open("Description Requierd !!","",{
        duration:3000,
      })
      return;
    }
    // all done
    this._category.addCategory(this.category).subscribe(
      (data:any)=>{
        this.category.title = '';
        this.category.description = '';
        Swal.fire('Success !!','Category is added successfuly','success').then((e)=>{
          this.router.navigate(['/admin/categpries']);
        });
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error !!','Server error !!','error');
      }
    )
  }

}
