import { Routes } from '@angular/router';
import { Login } from './user/login/login';
import { Register } from './user/register/register';
import { AdminLogin } from './admin/admin-login/admin-login';
import { UserManagement } from './admin/user-management/user-management';
import { Home } from './home/home'; // 1. Import Home

export const routes: Routes = [
  // User Routes
  { path: '', redirectTo: 'login', pathMatch: 'full' }, 
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'home', component: Home }, // 2. Add this line

  // Admin Routes
  { path: 'admin/login', component: AdminLogin },
  { path: 'admin/users', component: UserManagement }, 
];