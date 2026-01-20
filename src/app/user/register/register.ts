import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private http: HttpClient, // Inject HttpClient
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      // Send data to backend
      this.http.post('http://localhost:3000/register', this.registerForm.value)
        .subscribe({
          next: (response) => {
            console.log('Success:', response);
            alert('Registration Successful!');
            this.router.navigate(['/login']);
          },
          error: (error) => {
            console.error('Error:', error);
            alert('Registration Failed');
          }
        });
    }
  }
}