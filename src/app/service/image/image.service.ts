import { Injectable } from '@angular/core';
import {Observable} from 'rxjs'
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private _http: HttpClient) { }

  addImage(data:any):Observable<any>{
    return this._http.post('http://localhost:8000/image/',data);
  }
  getImage(id:number,language:string):Observable<any>{
    return this._http.get(`http://localhost:8000/image/${id}`);
  }
  deleteImage(id:number):Observable<any>{
    return this._http.delete(`http://localhost:8000/image/${id}`)
  }
  updateImage(id:number,data:any):Observable<any>{
    return this._http.put(`http://localhost:8000/image/${id}`,data);
  }
}
