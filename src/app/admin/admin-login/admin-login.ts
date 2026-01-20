import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './admin-login.html',
})
export class AdminLogin {
  adminLoginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private router: Router) {}

  onAdminLogin() {
    // Perform authentication logic here
    console.log('Admin login attempt');
    
    // On success, redirect to User Management
    this.router.navigate(['/admin/users']);
  }
}