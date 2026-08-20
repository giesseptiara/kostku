import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

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

export interface RoomInput {
  name: string;
  description: string;
  price: number;
  status: 'AVAILABLE' | 'OCCUPIED';
  size: string;
}

interface RoomsResponse {
  success: boolean;
  data: Room[];
}

interface RoomResponse {
  success: boolean;
  message: string;
  data: Room;
}

@Injectable({
  providedIn: 'root',
})
export class Rooms {
  private apiUrl = `${environment.apiUrl}/rooms`;

  constructor(private http: HttpClient) {}

  getRooms(): Observable<RoomsResponse> {
    return this.http.get<RoomsResponse>(this.apiUrl);
  }

  createRoom(data: RoomInput): Observable<RoomResponse> {
    return this.http.post<RoomResponse>(this.apiUrl, data);
  }

  updateRoom(id: number, data: RoomInput): Observable<RoomResponse> {
    return this.http.put<RoomResponse>(
      `${this.apiUrl}/${id}`,
      data
    );
  }

  deleteRoom(id: number): Observable<RoomResponse> {
    return this.http.delete<RoomResponse>(
      `${this.apiUrl}/${id}`
    );
  }
}