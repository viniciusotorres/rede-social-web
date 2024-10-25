import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/service/auth/auth.service';

@Component({
  selector: 'app-confirm-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './confirm-password.component.html',
  styleUrls: ['./confirm-password.component.scss']
})
export class ConfirmPasswordComponent implements OnInit {
  confirmPasswordForm!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.confirmPasswordForm = this.fb.group({
      token: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.mustMatch('password', 'confirmPassword') });
  }

  
  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  onSubmit(): void {
    if (this.confirmPasswordForm.valid) {
      this.isLoading = true;
      const password = this.confirmPasswordForm.value.password;
      const token = this.confirmPasswordForm.value.token;
      const email = sessionStorage.getItem('email');
      if (!email) {     
        console.error('Email não encontrado');
        return;
      }
      this.authService.confirmPassword(token, password, email).subscribe(
        () => { 
          this.isLoading = false;
          alert('Senha redefinida com sucesso.');
          this.router.navigate(['/inicio/entrar']);
        },
        (error: any) => {
          this.isLoading = false;
          console.error('Erro ao confirmar senha', error);
        }
      );
    }
  }
}