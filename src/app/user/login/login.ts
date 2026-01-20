import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http'; 
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink], 
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  // Inject Router here
  constructor(private http: HttpClient, private router: Router) {}

  login() {
    if (this.loginForm.valid) {
      // Ensure this URL matches your backend
      this.http.post('http://localhost:3000/login', this.loginForm.value)
        .subscribe({
          next: (response: any) => {
            console.log('Login successful:', response);
            localStorage.setItem('user', JSON.stringify(response.user));
            
            // FIX: Redirect to '/home' instead of '/'
            this.router.navigate(['/home']); 
          },
          error: (error) => {
            console.error('Login failed:', error);
            alert('Invalid Email or Password');
          }
        });
    }
  }
}