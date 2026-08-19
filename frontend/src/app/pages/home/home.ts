import { Component } from '@angular/core';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';

import { Kost, KostData } from '../../services/kost';
import { Rooms, Room } from '../../services/rooms';
import { Facilities, Facility } from '../../services/facilities';
import { Gallery, GalleryItem } from '../../services/gallery';

@Component({
  selector: 'app-home',
  imports: [AsyncPipe, DecimalPipe, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  kost$: Observable<KostData | null>;
  rooms$: Observable<Room[] | null>;
  facilities$: Observable<Facility[] | null>;
  gallery$: Observable<GalleryItem[] | null>;

  constructor(
    private kostService: Kost,
    private roomsService: Rooms,
    private facilitiesService: Facilities,
    private galleryService: Gallery
  ) {
    this.kost$ = this.kostService.getKost().pipe(
      map((response) => response.data),
      catchError((error) => {
        console.error('Gagal mengambil data kost:', error);
        return of(null);
      })
    );

    this.rooms$ = this.roomsService.getRooms().pipe(
      map((response) => response.data),
      catchError((error) => {
        console.error('Gagal mengambil data kamar:', error);
        return of(null);
      })
    );

    this.facilities$ = this.facilitiesService.getFacilities().pipe(
      map((response) => response.data),
      catchError((error) => {
        console.error('Gagal mengambil fasilitas:', error);
        return of(null);
      })
    );

    this.gallery$ = this.galleryService.getGallery().pipe(
      map((response) => response.data),
      catchError((error) => {
        console.error('Gagal mengambil gallery:', error);
        return of(null);
      })
    );
  }
}