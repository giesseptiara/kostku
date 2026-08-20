import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Facility {
  id: number;
  name: string;
  description: string;
  icon: string;
  created_at: string;
}

export interface FacilityInput {
  name: string;
  description: string;
  icon: string;
}

interface FacilitiesResponse {
  success: boolean;
  data: Facility[];
}

interface FacilityResponse {
  success: boolean;
  message: string;
  data: Facility;
}

@Injectable({
  providedIn: 'root',
})
export class Facilities {
  private apiUrl = `${environment.apiUrl}/facilities`;

  constructor(private http: HttpClient) {}

  getFacilities(): Observable<FacilitiesResponse> {
    return this.http.get<FacilitiesResponse>(
      this.apiUrl
    );
  }

  createFacility(
    data: FacilityInput
  ): Observable<FacilityResponse> {
    return this.http.post<FacilityResponse>(
      this.apiUrl,
      data
    );
  }

  updateFacility(
    id: number,
    data: FacilityInput
  ): Observable<FacilityResponse> {
    return this.http.put<FacilityResponse>(
      `${this.apiUrl}/${id}`,
      data
    );
  }

  deleteFacility(
    id: number
  ): Observable<FacilityResponse> {
    return this.http.delete<FacilityResponse>(
      `${this.apiUrl}/${id}`
    );
  }
}