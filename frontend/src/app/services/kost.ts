import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface KostData {
  id: number;
  name: string;
  description: string;
  address: string;
  city: string;
  price_start: number;
  whatsapp: string;
  latitude: number;
  longitude: number;
}

interface KostResponse {
  success: boolean;
  data: KostData;
}

@Injectable({
  providedIn: 'root',
})
export class Kost {
  private apiUrl = 'http://localhost:5000/api/kost';

  constructor(private http: HttpClient) {}

  getKost(): Observable<KostResponse> {
    console.log('GET KOST API:', this.apiUrl);
    return this.http.get<KostResponse>(this.apiUrl);
  }
}