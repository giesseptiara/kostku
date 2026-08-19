import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface GalleryItem {
  id: number;
  title: string;
  image_url: string;
  description: string;
  created_at: string;
}

interface GalleryResponse {
  success: boolean;
  data: GalleryItem[];
}

@Injectable({
  providedIn: 'root',
})
export class Gallery {
  private apiUrl = 'http://localhost:5000/api/gallery';

  constructor(private http: HttpClient) {}

  getGallery(): Observable<GalleryResponse> {
    return this.http.get<GalleryResponse>(this.apiUrl);
  }
}