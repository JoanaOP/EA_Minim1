import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Denuncia } from '../models/denuncia';

@Injectable({
  providedIn: 'root'
})
export class DenunciaService {

  url = 'http://localhost:3000/api/denuncias';

  constructor(private http:HttpClient) { }

  getDenuncias(): Observable<Denuncia[]>{
    return this.http.get<Denuncia[]>(this.url);
  }

  getDenuncia(nameDenuncia: string): Observable<Denuncia>{
    return this.http.get<Denuncia>(this.url + "/" + nameDenuncia);
  }

  addDenuncia(denuncia: Denuncia): Observable<string>{
    return this.http.post(this.url, denuncia,{responseType: 'text'});
  }

  updateDenuncia(denuncia: Denuncia, nameDenuncia: string): Observable<string>{
    return this.http.put(this.url + "/" + nameDenuncia, denuncia, {responseType: 'text'});
  }

  deleteDenuncia(nameDenuncia: string): Observable<string>{
    return this.http.delete(this.url + "/" + nameDenuncia, {responseType: 'text'});
  }
}
