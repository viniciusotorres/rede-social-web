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
  imageSrc: string | ArrayBuffer | null = '';
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }
  
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', Validators.required],
      birthdate: ['', Validators.required],
      photo: ['', Validators.required],
      bio: [''],
    });
  }

 onSubmit(): void {
    
      const formData = new FormData();
      formData.append('email', this.registerForm.get('email')?.value);
      formData.append('password', this.registerForm.get('password')?.value);
      formData.append('name', this.registerForm.get('name')?.value);
      formData.append('birthdate', this.registerForm.get('birthdate')?.value);
      formData.append('bio', this.registerForm.get('bio')?.value);
      if (this.selectedFile) {
        formData.append('photo', this.selectedFile);
      

      this.auth.register(formData).subscribe(
        (response: { token: string; }) => {
          console.log('Registration successful', response);
          const email = this.registerForm.get('email')?.value;
          sessionStorage.setItem('email', email);
          sessionStorage.setItem('authToken', response.token);
          this.router.navigate(['inicio/registro/token']);
        },
        (error: any) => {
          console.error('Registration failed', error);
        }
      );
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      this.handleInvalidFileType();
      return;
    }

    this.handleFileSelection(file);
  }

  private handleFileSelection(file: File): void {
    this.selectedFile = file;
    this.readFile(file);
  }

  private handleInvalidFileType(): void {
    alert('Tipo de arquivo inválido. Permitido apenas JPG e PNG.');
    const fileInput = document.getElementById('photo') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  private readFile(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.imageSrc = reader.result;
    };
    reader.readAsDataURL(file);
  }

  triggerFileInput(): void {
    const fileInput = document.getElementById('photo') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }
}

