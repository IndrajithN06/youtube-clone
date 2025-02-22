import { Component } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service'; // Adjust the path to your service
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-search',
  standalone: true,
  imports: [HttpClientModule, FormsModule,CommonModule],
  templateUrl: './video-search.component.html',
  styleUrls: ['./video-search.component.css'],
})
export class VideoSearchComponent {
  searchQuery: string = '';
  videos: any[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';
  selectedVideoUrl: SafeResourceUrl | null = null;

  constructor(private youtubeService: YoutubeService,private route:ActivatedRoute,private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    // Retrieve the query parameter when the component initializes
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['query'] || '';  // Set the search query from URL if exists
      this.onSearch();  // Call the search function
    });
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.isLoading = true;
      this.errorMessage = '';
      this.selectedVideoUrl = null;
      this.youtubeService.searchVideos(this.searchQuery).subscribe(
        (response) => {
          this.videos = response.items;
          this.isLoading = false;
        },
        (error) => {
          this.errorMessage = 'An error occurred while fetching data.';
          this.isLoading = false;
        }
      );
    }
  }

  playVideo(videoId:string): void {
     // Set the selected video
    this.selectedVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${videoId}`
    );
  }

  closeVideo(): void {
    this.selectedVideoUrl = null; // Close the video player
  }
}
