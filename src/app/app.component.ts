import { Component } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { LoadingComponent } from './modules/shared/components/loading/loading.component';
import { CommonModule } from '@angular/common';
import { AuthService } from './modules/core/service/auth/auth.service';
import { MaterialModule } from './material.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoadingComponent, CommonModule, MaterialModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'rede-social-front';

  isLoading = true;

  constructor(private router: Router, private auth: AuthService) {
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

  goToFeed(){
    this.isLoading = true;
    this.router.navigate(['feed']);
  }

  goToHome(){
    this.isLoading = true;
    this.router.navigate(['inicio']);
  }

  logout(){
    this.auth.logout();
    this.router.navigate(['inicio']);
  }

  changeStatus(): void {
  }
}
