import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/service/internal/user/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  user: any = {};
  loggedInUserId: string | null = null;
  isViewingOwnProfile: boolean = true;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loggedInUserId = sessionStorage.getItem('userId');
    if (this.loggedInUserId) {
      this.bringUser(this.loggedInUserId);
    }
  }

  bringUser(userId: string) {
  this.userService.getUser(userId).subscribe((response) => {
    this.user = response;
  });
  }

  // Método para alternar entre perfis
  switchUser(userId: string) {
    this.isViewingOwnProfile = this.loggedInUserId === userId;
    this.bringUser(userId);
  }

}
