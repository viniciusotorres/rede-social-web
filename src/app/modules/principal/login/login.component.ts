import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../../core/service/auth/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { loginInterface } from '../../core/models/login.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';

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
  isLoading = false;
  
  constructor(
    private fb: FormBuilder, 
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToastrService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.auth.login(this.loginForm.value as loginInterface).subscribe(
        response => {
          if (response.token) {
            this.isLoading = true;
            this.toast.success('Login efetuado com sucesso!');
            sessionStorage.setItem('token', response.token);
            sessionStorage.setItem('userId', response.userId);
            this.auth.emitLoginEvent();
            this.router.navigate(['/feed']).then(() => {
              window.location.reload();
            });
            
          }
        },
        error => {
          this.isLoading = false;
          this.toast.error('Email ou senha incorretos');
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
