import { Routes } from '@angular/router';
import { Login } from './user/login/login';
import { Register } from './user/register/register';
import { AdminLogin } from './admin/admin-login/admin-login';
import { UserManagement } from './admin/user-management/user-management';
// Assuming you create a Home component
// import { Home } from './home/home'; 

export const routes: Routes = [
  // User Routes
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // You can change this to a Home component later
  { path: 'login', component: Login },
  { path: 'register', component: Register },

  // Admin Routes
  { path: 'admin/login', component: AdminLogin },
  { path: 'admin/users', component: UserManagement }, // Redirect here after admin login
];