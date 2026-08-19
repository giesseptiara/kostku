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

export interface GalleryInput {
  title: string;
  image_url: string;
  description: string;
}

interface GalleryResponse {
  success: boolean;
  data: GalleryItem[];
}

interface GalleryItemResponse {
  success: boolean;
  message: string;
  data: GalleryItem;
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

  createGallery(
    data: GalleryInput
  ): Observable<GalleryItemResponse> {
    return this.http.post<GalleryItemResponse>(
      this.apiUrl,
      data
    );
  }

  updateGallery(
    id: number,
    data: GalleryInput
  ): Observable<GalleryItemResponse> {
    return this.http.put<GalleryItemResponse>(
      `${this.apiUrl}/${id}`,
      data
    );
  }

  deleteGallery(
    id: number
  ): Observable<GalleryItemResponse> {
    return this.http.delete<GalleryItemResponse>(
      `${this.apiUrl}/${id}`
    );
  }
}