import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Room {
  id: number;
  name: string;
  description: string;
  price: string;
  status: 'AVAILABLE' | 'OCCUPIED';
  size: string;
  created_at: string;
  updated_at: string;
}

interface RoomsResponse {
  success: boolean;
  data: Room[];
}

@Injectable({
  providedIn: 'root',
})
export class Rooms {
  private apiUrl = 'http://localhost:5000/api/rooms';

  constructor(private http: HttpClient) {}

  getRooms(): Observable<RoomsResponse> {
    return this.http.get<RoomsResponse>(this.apiUrl);
  }
}