import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  // We can reuse the global styles, or create a specific css file if needed
})
export class Home {
  
  constructor(private router: Router) {}

  logout() {
    // Clear any stored user data
    localStorage.removeItem('user');
    // Redirect back to login
    this.router.navigate(['/login']);
  }
}