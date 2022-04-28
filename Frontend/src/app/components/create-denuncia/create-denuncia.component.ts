import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Denuncia } from 'src/app/models/denuncia';
import { DenunciaService } from 'src/app/service/denuncia.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-create-denuncia',
  templateUrl: './create-denuncia.component.html',
  styleUrls: ['./create-denuncia.component.css']
})
export class CreateDenunciaComponent implements OnInit {

  denunciaForm: FormGroup;
  title = "Create Denuncia";
  nameEditedDenuncia: string | null;

  constructor(private fb: FormBuilder, 
    private router: Router, 
    private toastr: ToastrService,
    private _denunciaService: DenunciaService,
    private _userService: UserService,
    private aRouter: ActivatedRoute) {
      this.denunciaForm = this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        user: ['', Validators.required],
        date: ['',Validators.required]
      });

      this.nameEditedDenuncia = this.aRouter.snapshot.paramMap.get("nameDenuncia");

    }


  ngOnInit(): void {
    this.editDenuncia();
  }

  addDenuncia(){
    const denuncia: Denuncia = {
      name: this.denunciaForm.get('name')?.value,
      description: this.denunciaForm.get('description')?.value,
      user: this.denunciaForm.get('user')?.value,      
      date: this.denunciaForm.get('date')?.value,
    }
    if(this.nameEditedDenuncia!=null ){
      //Edit Denuncia
      this._denunciaService.updateDenuncia(denuncia, this.nameEditedDenuncia).subscribe(data => {
        this.toastr.info('Denuncia successfully edited!', 'Denuncia edited');
        this.router.navigate(['/list-denuncias']);
      }, error => {
        this.toastr.error("Couldn't modify the denuncia","Error")
        console.log(error);
      })
    }else{
      //Add Denuncia
      this._denunciaService.addDenuncia(denuncia).subscribe(data => {
        this.toastr.success('Denuncia successfully created','Denuncia created!');
        this.router.navigate(['/list-denuncias']);
      }, error => {
        this.toastr.error("Couldn't create the denuncia due to some error, please try again","Error creating the denuncia");
        console.log(error);
      });
      
    }
  }

  editDenuncia(){
    if(this.nameEditedDenuncia!=null){
      this.title = "Edit Denuncia";
      this._denunciaService.getDenuncia(this.nameEditedDenuncia).subscribe(data => {
        console.log(data);
        this.denunciaForm.setValue({
          name: data.name,
          description: data.description,
          user: data.user.name,
          date: data.date.toString().split('T')[0]
        })
      }, error => {
        console.log(error);
        this.toastr.error("Cannot find the denuncia","Error");
      });
    }
  } 

}
