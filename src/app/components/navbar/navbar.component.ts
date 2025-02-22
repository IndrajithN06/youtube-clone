import { Component, OnInit , EventEmitter, Output, HostListener} from '@angular/core';
import { AuthService } from '../../services/authService'; // Correct path
import { RouterModule } from '@angular/router'; // Import RouterModule
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-navbar',
  standalone: true, // Ensure it's a standalone component
  imports: [RouterModule, CommonModule, FormsModule], // Include RouterModule for routing directives
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Output() toggleSidebarEvent = new EventEmitter<void>();
  isLoggedIn = false; // Tracks the login status
  isSidebarOpen: boolean = false;
  searchQuery: string = '';
  isListening: boolean = false; // Tracks whether voice recognition is active
  recognition: any; // Speech recognition instance
  isDropdownVisible = false;

  constructor(private authService: AuthService, private router: Router) {
    // Initialize SpeechRecognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
    this.recognition.lang = 'en-US';
    this.recognition.continuous = false;
    this.recognition.interimResults = false;
  }

  ngOnInit(): void {
    // Subscribe to login status updates
    this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
    });

    // Setup recognition result handling
    this.recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      this.searchQuery = transcript; // Set search query to voice input
     // this.onSearch(); // Perform search
    };

    this.recognition.onerror = (event: any) => {
      console.error('Voice recognition error:', event);
    };

    this.recognition.onend = () => {
      this.isListening = false;
    };
  }

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  @HostListener('document:click', ['$event'])
  closeDropdownOnClickOutside(event: MouseEvent) {
    const profileMenu = document.querySelector('.profile-menu');
    if (profileMenu && !profileMenu.contains(event.target as Node)) {
      this.isDropdownVisible = false;
    }
  }

  navigateTo(page: string) {
    this.router.navigate([`/${page}`]);
  }

  logout(): void {
    this.authService.logout(); // Call the logout method in AuthService
  }



  toggleSidebar(): void {
    this.toggleSidebarEvent.emit();
  }

  onSearch(): void {
    // Navigate to the video-search route when search button is clicked
    if (this.searchQuery.trim()) {
      this.router.navigate(['/youtube-public-videos'], { queryParams: { query: this.searchQuery } });
    }
  }

  toggleListening(): void {
    if (this.isListening) {
      this.recognition.stop(); // Stop listening
    } else {
      this.recognition.start(); // Start listening
    }
    this.isListening = !this.isListening;
  }
}
