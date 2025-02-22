import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router, RouterModule } from '@angular/router';
import { LoginUserDto } from '../../dto/login-user-dto';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../services/authService';  // Import AuthService

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private userService: UserService, private router: Router, private authService: AuthService) {}

  onSubmit() {
    // Clear any previous messages before the submission
    this.errorMessage = '';

    // Basic client-side validation
    if (!this.email || !this.password) {
      this.errorMessage = 'All fields are required!';
    } else {
      const loginUserDto: LoginUserDto = {
        email: this.email,
        password: this.password,
      };

      // Call the loginUser method from UserService
      this.userService.loginUser(loginUserDto).subscribe(
        (response: { token: string }) => {
          console.log('Logged in Successfully', response.token); // Handle success response

          // Update login status in AuthService
          this.authService.login(response.token);

          // Redirect to home page or dashboard after successful login
          this.router.navigate(['/home']);  // Redirect to home or any other route
        },
        (error: HttpErrorResponse) => {
          if (error.status === 401) {
            // Invalid credentials error handling
            this.errorMessage = 'Invalid credentials. Please try again.';
          } else {
            // Handle other types of errors
            this.errorMessage = 'Login failed. Please try again later.';
          }
          console.log(error.error); // Log error for debugging
        }
      );
    }
  }
}
