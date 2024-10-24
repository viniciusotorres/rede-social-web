import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/service/auth/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    // if (this.forgotPasswordForm.valid) {
    //   const email = this.forgotPasswordForm.value.email;
    //   this.authService.forgotPassword(email).subscribe(
    //     () => {
    //       alert('Instruções para redefinir a senha foram enviadas para o seu e-mail.');
    //       this.router.navigate(['/login']);
    //     },
    //     (error: any) => {
    //       console.error('Erro ao enviar instruções de redefinição de senha', error);
    //     }
    //   );
    // }
    this.router.navigate(['/inicio/resetar-senha']);
  }
}