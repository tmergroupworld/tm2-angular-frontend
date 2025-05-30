import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PhotoUploadService {
  constructor(private http: HttpClient) {}

  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', file);

    const headers = new HttpHeaders({
      Accept: 'application/json',
    });

    return this.http.post<{ imageUrl: string }>(
      `${environment.apiUrl}/photo-upload`,
      formData,
      {
        headers,
        withCredentials: true,
      }
    );
  }
}
