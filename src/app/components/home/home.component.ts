import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VideoService } from '../../services/video.service';
import { SafeUrlPipe } from '../../pipes/safe-url.pipe';
import { filter } from 'rxjs/operators';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SafeUrlPipe],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  videos: { 
    id:number;
    title: string; 
    description: string; 
    thumbnailUrl: string; 
    videoUrl: string; 
    user: { username: string; } 
  }[] = [];

  isLoading = true;
  errorMessage = '';

  constructor(
    private videoService: VideoService,
    private router: Router ,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.fetchVideos();

    // Listen for route changes to pause videos when navigating to the home page
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      if (this.router.url === '/home') {
        this.pauseAllVideos(); // Pause all videos when navigating to home
      }
    });
  }

  ngOnDestroy(): void {
    // Pause all videos when the component is destroyed
    this.pauseAllVideos();
  }

  fetchVideos(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.videoService.getVideos().subscribe(
      (response) => {
        this.videos = response.map((video) => {
          const baseUrl = `https://localhost:7052/${video.videoUrl}`;
          const url = new URL(baseUrl);
          url.searchParams.set('autoplay', '0');
          video.videoUrl = url.toString();
          return video;
        });
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Failed to fetch videos. Please try again later.';
        console.error('Error fetching videos:', error);
        this.isLoading = false;
      }
    );
  }

  pauseAllVideos(): void {
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach((iframe: HTMLIFrameElement) => {
      iframe.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    });
  }


  deleteVideo(videoId: number): void {
    if (confirm('Are you sure you want to delete this video?')) {
      this.videoService.deleteVideo(videoId).subscribe(
        () => {
          // Create a new array excluding the deleted video
          this.videos = this.videos.filter(video => video.id !== videoId);
          console.log('Filtered videos:', this.videos); 
         
        },
        (error: any) => {
          this.errorMessage = 'Error deleting video.';
          console.error(error);
        }
      );
    }
  }
  
}
