import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../../core/service/internal/user/user.service';
import { MaterialModule } from '../../../../../../material.module';

@Component({
  selector: 'side-info-user',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './side-info-user.component.html',
  styleUrl: './side-info-user.component.scss'
})
export class SideInfoUserComponent implements OnInit {

  constructor(private userService: UserService) { }

  loggedInUser = {
    userId: 1,
    userName: 'Logged In User',
    email: 'user@example.com',
    followersCount: 150,
    followingCount: 100,
    postsCount: 50,
    profilePicture: 'https://via.placeholder.com/150',
    status: sessionStorage.getItem('token') ? 'Online' : 'Offline',
    reach: 5000
  };

  showMetrics = false;


  ngOnInit(): void {
    this.loadUserProfile();
  }

  private loadUserProfile(): void {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      this.userService.getUser(userId).subscribe(
        (data: any) => {
          this.loggedInUser = data;
          this.loggedInUser.status = sessionStorage.getItem('token') ? 'Online' : 'Offline';
        },
        (error: any) => {
          console.error('Error fetching user profile:', error);
        }
      );
    } else {
      console.error('No user ID found in sessionStorage');
    }
  }

  toggleMetrics() {
    this.showMetrics = !this.showMetrics;
  }

}
