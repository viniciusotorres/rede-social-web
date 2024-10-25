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
  timeLeft: number = 600; 
  interval: any;
  isLoading = false;
  isLoadingAgain = false;

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
    this.email = sessionStorage.getItem('email') || '';
    this.tokenForm = this.fb.group({
      token1: ['', [Validators.required, Validators.maxLength(1)]],
      token2: ['', [Validators.required, Validators.maxLength(1)]],
      token3: ['', [Validators.required, Validators.maxLength(1)]],
      token4: ['', [Validators.required, Validators.maxLength(1)]],
      token5: ['', [Validators.required, Validators.maxLength(1)]],
      token6: ['', [Validators.required, Validators.maxLength(1)]]
    });

    this.startTimer();
  }

  startTimer(): void {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.interval);
        // Redirecionar ou mostrar mensagem de tempo esgotado
        alert('Tempo esgotado!');
        this.router.navigate(['/']);
      }
    }, 1000);
  }

  get formattedTime(): string {
    const minutes: number = Math.floor(this.timeLeft / 60);
    const seconds: number = this.timeLeft % 60;
    return `${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  pad(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  onSubmit(): void {
    this.isLoading = true;
    if (this.tokenForm.valid) {
      const token = `${this.tokenForm.get('token1')?.value}${this.tokenForm.get('token2')?.value}${this.tokenForm.get('token3')?.value}${this.tokenForm.get('token4')?.value}${this.tokenForm.get('token5')?.value}${this.tokenForm.get('token6')?.value}`;
      this.auth.validarToken(this.email, token).subscribe(
        (response: any) => {
          this.isLoading = false;
          this.router.navigate(['/inicio']);
        },
        (error: any) => {
          this.isLoading = false;
          console.error('Token validation failed', error);
        }
      );
    }
  }

  onInput(event: any, nextInput: HTMLInputElement): void {
    if (event.target.value.length === event.target.maxLength) {
      nextInput.focus();
    }
  }

  resendToken(): void {
    this.isLoadingAgain = true;
    this.auth.sendAgainCode(this.email).subscribe(
      (response: any) => {
        this.isLoadingAgain = false;
        window.location.reload();
      },
      (error: any) => {
        this.isLoadingAgain = false;
        console.error('Failed to send token again', error);
      }
    );
  }
}