import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common'; // Import CommonModule for *ngFor
import { HttpClient } from '@angular/common/http';

// Define what a User looks like
interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  lastActive: Date;
  avatarUrl: string;
}

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule], // Important for *ngFor and Pipes
  templateUrl: './user-management.html',
})
export class UserManagement implements OnInit {
  
  users: User[] = []; // List to store users from DB

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.http.get<User[]>('http://localhost:3000/admin/users')
      .subscribe({
        next: (data) => {
          this.users = data;
        },
        error: (err) => {
          console.error('Error fetching users:', err);
        }
      });
  }

  // Helper functions for dynamic styling
  getRoleColor(role: string): string {
    switch (role) {
      case 'Administrator': case 'admin': return 'bg-primary';
      case 'Career Coach': return 'bg-purple-500';
      default: return 'bg-slate-400';
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Active': return 'bg-emerald-50 text-emerald-700 ring-emerald-600/20';
      case 'Pending': return 'bg-amber-50 text-amber-700 ring-amber-600/20';
      case 'Suspended': return 'bg-red-50 text-red-700 ring-red-600/20';
      default: return 'bg-slate-50 text-slate-700';
    }
  }
}