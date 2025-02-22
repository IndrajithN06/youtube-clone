import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // This makes the service available throughout the app
})
export class VideoService {
  private baseUrl = 'https://localhost:7052/api/Video'; // Backend URL

  constructor(private http: HttpClient) {}

  uploadVideo(formData: FormData): Observable<any> {
    const token = localStorage.getItem('authToken');  // Retrieve token from localStorage
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.post(`${this.baseUrl}/upload`, formData, { headers }).pipe(
      catchError((error) => {
        console.error('Error uploading video:', error);
        throw error;
      })
    );
  }

  // Fetch all videos
  getVideos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all`).pipe(
      catchError((error) => {
        console.error('Error fetching videos:', error);
        throw error;
      })
    );
  }


  deleteVideo(videoId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${videoId}`,{ responseType: 'text' as 'json' });
  }
}

