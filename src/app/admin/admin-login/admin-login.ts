import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http'; // 1. Import HttpClient

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [ReactiveFormsModule], // Remove RouterLink if not used in HTML, or keep it
  templateUrl: './admin-login.html',
})
export class AdminLogin {
  adminLoginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  // 2. Inject HttpClient
  constructor(private router: Router, private http: HttpClient) {}

  onAdminLogin() {
    if (this.adminLoginForm.valid) {
      // 3. Send Request to Backend
      this.http.post('http://localhost:3000/admin/login', this.adminLoginForm.value)
        .subscribe({
          next: (response: any) => {
            console.log('Admin Access Granted');
            
            // Store admin session (optional but recommended)
            localStorage.setItem('adminUser', 'true');

            // Redirect to User Management
            this.router.navigate(['/admin/users']);
          },
          error: (error) => {
            console.error('Admin Login Failed', error);
            alert('Invalid Admin Username or Password');
          }
        });
    }
  }
}