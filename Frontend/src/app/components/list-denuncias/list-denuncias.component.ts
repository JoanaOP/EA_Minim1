import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Denuncia } from 'src/app/models/denuncia';
import { DenunciaService } from 'src/app/service/denuncia.service';

@Component({
  selector: 'app-list-denuncias',
  templateUrl: './list-denuncias.component.html',
  styleUrls: ['./list-denuncias.component.css']
})
export class ListDenunciasComponent implements OnInit {

  listDenuncias: Denuncia[] = [];

  constructor(private _denunciaService: DenunciaService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getDenuncias();
  }

  getDenuncias(){
    console.log("get");
    this._denunciaService.getDenuncias().subscribe(data => {
      console.log(data);
      this.listDenuncias = data;
    }, error => {
      console.log(error);
    })
  }

  deleteDenuncia(nameDenuncia: string){
    const confirmDelete = confirm("Denuncia "+nameDenuncia+" will be deleted, do you want to continue?");
    if(confirmDelete===true){
      this._denunciaService.deleteDenuncia(nameDenuncia).subscribe(data => {
        this.toastr.success('Denuncia successfully deleted', 'Denuncia deleted');
        this.getDenuncias();
      }, error => {
        this.toastr.error("Denuncia can not be deleted, please try again","Error deleting denuncia");
        console.log(error);
      })
    }    
  }

}
