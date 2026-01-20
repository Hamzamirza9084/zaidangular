import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Api {
  private baseUrl = 'http://localhost:3000/api'; // Replace with your Node.js server URL

  constructor(private http: HttpClient) {}

  // Method to get career recommendations based on user profile
  getRecommendations(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/recommendations`, userData);
  }

  // Method to register a new user
  registerUser(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }
}