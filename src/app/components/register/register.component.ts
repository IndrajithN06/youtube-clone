import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';  // Import HttpClientModule
import { UserService } from '../../services/user.service';
import { RegisterUserDto } from '../../dto/register-user-dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],  // Add HttpClientModule to imports
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';
  successMessage = '';

  constructor(private userService: UserService,private router: Router) {}

  onSubmit() {
    // Clear any previous messages before the submission
    this.errorMessage = '';
    this.successMessage = '';

    // Basic client-side validation
    if (!this.username || !this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = 'All fields are required!';
    } else if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match!';
    } else {
      // Create RegisterUserDto
      const registerUserDto: RegisterUserDto = {
        username: this.username,
        email: this.email,
        password: this.password,
      };

      // Call the registerUser method from UserService
      this.userService.registerUser(registerUserDto).subscribe(
        (response: string) => {
          this.successMessage = 'Registration successful!';
          this.router.navigate(['/login']);
          console.log(response); // Handle success response
        },
        (error: HttpErrorResponse) => {
          if (error.status === 400) {
            // Backend-specific error for duplicate username or email
            this.errorMessage = 'Username or Email already exists!';
          } else {
            this.errorMessage = 'Registration failed. Please try again!';
          }
          console.error(error); // Log or handle error response
        }
      );
    }
  }
}
