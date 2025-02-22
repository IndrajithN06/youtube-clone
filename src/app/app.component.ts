import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';  // Import RouterModule and RouterOutlet
import { NavbarComponent } from './components/navbar/navbar.component'; 
import { SidebarComponent } from './components/sidebar/sidebar.component'; // NavbarComponent
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, RouterOutlet, NavbarComponent,SidebarComponent,CommonModule],  // Ensure RouterModule and RouterOutlet are here
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isSidebarVisible = true;

  toggleSidebar(): void {
    this.isSidebarVisible = !this.isSidebarVisible;
  }
  title = 'youtube-clone';
}
