import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit {
  videoId: string | null = null;
  videoUrl: SafeResourceUrl | null = null;
  // Map video IDs to YouTube URLs or embed URLs
  videoMap: { [key: string]: string } = {
    '1': 'https://www.youtube.com/embed/3qBXWUpoPHo', // Example video ID
    '2': 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Another example
    '3': 'https://www.youtube.com/embed/tgbNymZ7vqY', // Another example
  };

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    // Fetch the videoId from the route parameters
    this.route.paramMap.subscribe(params => {
      this.videoId = params.get('id');
      if (this.videoId && this.videoMap[this.videoId]) {
        // Use the videoMap to get the video URL based on videoId
        const videoEmbedUrl = this.videoMap[this.videoId];
        // Sanitize the URL for embedding
        this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoEmbedUrl);
      } else {
        // If videoId is not in the map, show a fallback or error
        this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/default_video_id');
      }
    });
  }
}
