import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

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

export interface GalleryUploadResponse {
  success: boolean;
  message: string;
  data: {
    image_url: string;
  };
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
  private apiUrl = `${environment.apiUrl}/gallery`;

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

  uploadImage(
  file: File
): Observable<GalleryUploadResponse> {
  const formData = new FormData();

  formData.append('image', file);

  return this.http.post<GalleryUploadResponse>(
    `${this.apiUrl}/upload`,
    formData
  );
}
}