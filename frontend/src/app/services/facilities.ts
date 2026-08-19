import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Facility {
  id: number;
  name: string;
  description: string;
  icon: string;
  created_at: string;
}

interface FacilitiesResponse {
  success: boolean;
  data: Facility[];
}

@Injectable({
  providedIn: 'root',
})
export class Facilities {
  private apiUrl = 'http://localhost:5000/api/facilities';

  constructor(private http: HttpClient) {}

  getFacilities(): Observable<FacilitiesResponse> {
    return this.http.get<FacilitiesResponse>(this.apiUrl);
  }
}