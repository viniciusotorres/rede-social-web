import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../../core/service/auth/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { loginInterface } from '../../core/models/login.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  @Output() loginEvent = new EventEmitter<void>();
  
  constructor(
    private fb: FormBuilder, 
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value as loginInterface).subscribe(
        response => {
          if (response.token) {
            sessionStorage.setItem('token', response.token);
            sessionStorage.setItem('userId', response.userId);
            this.auth.emitLoginEvent();
            this.router.navigate(['/feed']).then(() => {
              window.location.reload(); 
            });
            
          }
        },
        error => {
          console.error('Login failed', error);
        }
      );
    }
  }

  goToRegister(): void {
    this.router.navigate(['inicio/registro'] );
  }

  goToForgotPassword(): void {
    this.router.navigate(['inicio/esqueci-senha']);
  }
  

}
