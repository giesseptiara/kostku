import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable, catchError, map, of } from 'rxjs';
import { Facilities, Facility } from '../../services/facilities';

@Component({
  selector: 'app-facilities',
  imports: [AsyncPipe],
  templateUrl: './facilities.html',
  styleUrl: './facilities.css',
})
export class FacilitiesComponent {
  facilities$: Observable<Facility[] | null>;

  constructor(private facilitiesService: Facilities) {
    this.facilities$ = this.facilitiesService.getFacilities().pipe(
      map((response) => response.data),
      catchError((error) => {
        console.error('Gagal mengambil data fasilitas:', error);
        return of(null);
      })
    );
  }
}