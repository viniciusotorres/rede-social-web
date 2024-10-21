import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/service/auth/auth.service';

@Component({
  selector: 'app-token-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './token-register.component.html',
  styleUrls: ['./token-register.component.scss']
})
export class TokenRegisterComponent implements OnInit {
  tokenForm!: FormGroup;
  email!: string;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.email = sessionStorage.getItem('email') || '';
    this.tokenForm = this.fb.group({
      token1: ['', [Validators.required, Validators.maxLength(1)]],
      token2: ['', [Validators.required, Validators.maxLength(1)]],
      token3: ['', [Validators.required, Validators.maxLength(1)]],
      token4: ['', [Validators.required, Validators.maxLength(1)]],
      token5: ['', [Validators.required, Validators.maxLength(1)]],
      token6: ['', [Validators.required, Validators.maxLength(1)]],
    });
  }

  onSubmit(): void {
    if (this.tokenForm.valid) {
      const token = `${this.tokenForm.get('token1')?.value}${this.tokenForm.get('token2')?.value}${this.tokenForm.get('token3')?.value}${this.tokenForm.get('token4')?.value}${this.tokenForm.get('token5')?.value}${this.tokenForm.get('token6')?.value}`;
      this.auth.validarToken(this.email, token).subscribe(
        (response: any) => {
          console.log('Token validation successful', response);
          this.router.navigate(['/inicio']);
        },
        (error: any) => {
          console.error('Token validation failed', error);
        }
      );
    }
  }
}