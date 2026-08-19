import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable, catchError, map, of } from 'rxjs';
import { Gallery, GalleryItem } from '../../services/gallery';

@Component({
  selector: 'app-gallery',
  imports: [AsyncPipe],
  templateUrl: './gallery.html',
  styleUrl: './gallery.css',
})
export class GalleryComponent {
  gallery$: Observable<GalleryItem[] | null>;

  constructor(private galleryService: Gallery) {
    this.gallery$ = this.galleryService.getGallery().pipe(
      map((response) => response.data),
      catchError((error) => {
        console.error('Gagal mengambil gallery:', error);
        return of(null);
      })
    );
  }
}