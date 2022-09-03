import { HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

export const BASE_URI = "https://file.io";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http:HttpClient) { }
  
  public uploadFile(file: File): Observable<HttpEvent<any>> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    let formData = new FormData();
    formData.append('file', file, file.name);

    let params = new HttpParams();

    const options = {
      params: params,
      reportProgress: true,
      headers
    };
    const req = new HttpRequest('POST', BASE_URI, formData, options);
    return this.http.request(req);
  }

}
