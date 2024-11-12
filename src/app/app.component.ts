import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { LoadingComponent } from './modules/shared/components/loading/loading.component';
import { CommonModule } from '@angular/common';
import { AuthService } from './modules/core/service/auth/auth.service';
import { MaterialModule } from './material.module';
import { UserService } from './modules/core/service/internal/user/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, MaterialModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'rede-social-front';
  searchResults: any[] = [];
  searchQuery: string = '';
  isLoading = true;
  isLogged = false;
  idOtherUser!: string;

  constructor(
    private router: Router, 
    private auth: AuthService, 
    private userService: UserService,
    ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.isLoading = true;
      } else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        setTimeout(() => {
          this.isLoading = false;
        }, 1000); 
      }
    });
  }

  ngOnInit(): void {
    const token = sessionStorage.getItem('token');
    if (token) {
      this.isLogged = true;
    }
  
  }

  onLogin(): void {
    this.isLogged = true;
  }

  onLogout(): void {
    this.isLogged = false;
  }

  goToFeed(){
    this.isLoading = true;
    this.router.navigate(['feed']);
  }

  goToHome(){
    this.isLoading = true;
    this.router.navigate(['inicio']);
  }

  goToMyProfile(){
    this.isLoading = true;
    const userId = sessionStorage.getItem('userId');
    this.router.navigate(['feed/perfil/' + userId]);
  }

  logout(){
    this.auth.logout();
    this.router.navigate(['inicio']);
    this.onLogout();
  }
  
  searchUser(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const name = inputElement.value;

    if (name.trim() === '') {
      this.searchResults = [];
      return;
    }

    this.userService.getUsersByName(name).subscribe((data: any) => {
      this.searchResults = data;
      this.idOtherUser = data.id;
    });
  }

  changeStatus(): void {
  }

  goToUserProfile(userId: string): void {
    const storedUserId = sessionStorage.getItem('userId');
    const numericStoredUserId = storedUserId ? parseInt(storedUserId, 10) : null;

    if (numericStoredUserId === parseInt(userId, 10)) {
      this.router.navigate(['/feed/perfil', userId]);
    } else {
      this.router.navigate(['/feed/perfil-pub', userId]);
    }
  }
}
