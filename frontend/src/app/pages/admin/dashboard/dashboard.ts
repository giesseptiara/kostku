import { Component } from '@angular/core';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';

import { Rooms, Room } from '../../../services/rooms';
import { Auth, Admin } from '../../../services/auth';

@Component({
  selector: 'app-dashboard',
  imports: [AsyncPipe, DecimalPipe, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  rooms$: Observable<Room[]>;
  admin$: Observable<Admin>;

  constructor(
    private roomsService: Rooms,
    private auth: Auth,
    private router: Router
  ) {
    this.rooms$ = this.roomsService.getRooms().pipe(
      map((response) => response.data),
      catchError((error) => {
        console.error('DASHBOARD ROOMS ERROR:', error);
        return of([]);
      })
    );

    this.admin$ = this.auth.getCurrentAdmin().pipe(
      map((response) => response.data.admin),
      catchError((error) => {
        console.error('GET ADMIN ERROR:', error);

        this.auth.logout();
        this.router.navigate(['/admin/login']);

        return of({
          id: 0,
          name: '',
          email: '',
        });
      })
    );
  }

  getAvailableRooms(rooms: Room[]): number {
    return rooms.filter(
      (room) => room.status === 'AVAILABLE'
    ).length;
  }

  getOccupiedRooms(rooms: Room[]): number {
    return rooms.filter(
      (room) => room.status === 'OCCUPIED'
    ).length;
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/admin/login']);
  }
}