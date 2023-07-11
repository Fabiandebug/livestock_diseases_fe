import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class DiseaseService {

  constructor(private _http: HttpClient) { }

  getIdentifiers():Observable<any>{
    return this._http.get("http://localhost:8000/disease/identifiers/")
  }
  addDisease(data:any):Observable<any>{
    return this._http.post('http://localhost:8000/disease/',data);
  }
  getDisease(identifier:string,language:string):Observable<any>{
    return this._http.get(`http://localhost:8000/disease/CBPP/${language}`);
  }
  deleteDisease(identifier:string,language:string):Observable<any>{
    return this._http.delete(`http://localhost:8000/disease/${identifier}/${language}`)
  }
  updateDisease(identifier:string,language:string,data:any):Observable<any>{
    return this._http.put(`http://localhost:8000/disease/${identifier}/${language}`,data);
  }

}
