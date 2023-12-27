import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

const BASE_URL = 'https://api.pexels.com/';
const API_KEY = environment.apiKey;

import { ApiResult } from '../models/api-result';


@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  private http = inject(HttpClient);
  constructor() {}

  searchPhoto(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: API_KEY,
    });

    const params = {
      query: 'people',
    };

    return this.http.get(BASE_URL, { headers, params });
  }

  getPhotos(page = 1): Observable<ApiResult> {
    const headers = new HttpHeaders({
      Authorization: API_KEY,
    });

    return this.http.get<ApiResult>(
      `${BASE_URL}v1/curated?page=${page}&per_page=10`,
      {
        headers,
      }
    );
  }

  getPhotoDetails(id: string): Observable<any> {
    return this.http.get<any>(`${BASE_URL}/v1/curated/${id}`);
  }
}
