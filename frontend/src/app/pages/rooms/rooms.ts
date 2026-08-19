import { Component } from '@angular/core';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { Observable, catchError, map, of } from 'rxjs';
import { Rooms, Room } from '../../services/rooms';

@Component({
  selector: 'app-rooms',
  imports: [AsyncPipe, DecimalPipe],
  templateUrl: './rooms.html',
  styleUrl: './rooms.css',
})
export class RoomsComponent {
  rooms$: Observable<Room[] | null>;

  constructor(private roomsService: Rooms) {
    this.rooms$ = this.roomsService.getRooms().pipe(
      map((response) => response.data),
      catchError((error) => {
        console.error('Gagal mengambil data rooms:', error);
        return of(null);
      })
    );
  }
}