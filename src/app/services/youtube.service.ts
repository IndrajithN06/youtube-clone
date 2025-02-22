import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  private apiUrl = 'https://www.googleapis.com/youtube/v3/search';
  private apiKey = 'AIzaSyA4p4UNtHAeHxOS7DWdSnEKkxh0712Cg8Y'; // Replace with your actual API key

  constructor(private http: HttpClient) {}

  searchVideos(query: string, maxResults: number = 50): Observable<any> {
    const params = new HttpParams()
      .set('part', 'snippet')
      .set('q', query)
      .set('maxResults', maxResults.toString())
      .set('key', this.apiKey);

    return this.http.get(this.apiUrl, { params });
  }
}
