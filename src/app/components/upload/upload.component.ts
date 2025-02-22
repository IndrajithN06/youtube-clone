import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { VideoService } from '../../services/video.service'; // Import the VideoService
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, FormsModule,MatSnackBarModule],
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {
  title = '';
  description = '';
  selectedFile: File | null = null;
  isUploading: boolean = false; // Flag to show/hide spinner

  constructor(private videoService: VideoService, private router: Router,private snackBar: MatSnackBar) {} // Inject Router properly

  // Capture the file selection event
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      console.log('Selected file:', this.selectedFile);  // Log selected file
    } else {
      console.log('No file selected');
    }
  }
  
  // Submit the form and call the service to upload the video
  onSubmit() {
    if (this.selectedFile) {
      // Create a new FormData object to append the fields
      const formData = new FormData();
      formData.append('title', this.title);              // Append the title
      formData.append('description', this.description);  // Append the description
      formData.append('videoFile', this.selectedFile);   // Append the selected video file

      console.log('Form Data:', this.title, this.description, this.selectedFile);

      // Show the spinner while uploading
      this.isUploading = true;

      // Call the uploadVideo method from the service

      // this.videoService.uploadVideo(formData).subscribe(
      //   (response) => {
      //     console.log('Video uploaded successfully:', response);
      //     alert('Video uploaded successfully!');
      //     this.router.navigate(['/home']); // Navigate to Home after successful upload
      //     this.isUploading = false;  // Hide the spinner after upload is complete
      //   },
      //   (error) => {
      //     console.error('Error uploading video:', error);
      //     alert('Error uploading video.');
      //     this.isUploading = false;  // Hide the spinner on error
      //   }
      // );

      this.videoService.uploadVideo(formData).subscribe(
        (response) => {
          console.log('Video uploaded successfully:', response);
          this.snackBar.open('Video uploaded successfully!', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar'],
          });
          this.router.navigate(['/home']);
          this.isUploading = false;
        },
        (error) => {
          console.error('Error uploading video:', error);
          if (error.status === 401) {
            this.snackBar.open('Please log in first to upload videos.', 'Login', {
              duration: 5000,
              panelClass: ['error-snackbar'],
            }).onAction().subscribe(() => {
              this.router.navigate(['/login']);
            });
          } else {
            this.snackBar.open('Error uploading video. Please try again later.', 'Close', {
              duration: 3000,
              panelClass: ['error-snackbar'],
            });
          }
          this.isUploading = false;
        }
      );
      
    } else {
      alert('Please select a file to upload.');
    }
  }
}
