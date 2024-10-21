import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/service/auth/auth.service';
import { CommonModule } from '@angular/common';
import { registerInterface } from '../../core/models/register.interface';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }
  
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', Validators.required],
      birthdate: ['', Validators.required],
      photo: ['', Validators.required],
      bio: [''],
      createdAt: [''],
      updatedAt: ['']
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.auth.register(this.registerForm.value as registerInterface).subscribe(
        response => {
          console.log('Registration successful', response);
          const email = this.registerForm.get('email')?.value;
          sessionStorage.setItem('email', email);
          sessionStorage.setItem('authToken', response.token);
          this.router.navigate(['inicio/registro/token']);
        },
        error => {
          console.error('Registration failed', error);
        }
      );
    }
  }
}
