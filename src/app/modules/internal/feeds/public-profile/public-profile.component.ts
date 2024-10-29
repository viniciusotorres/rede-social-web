import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../core/service/internal/user/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-public-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './public-profile.component.html',
  styleUrl: './public-profile.component.scss'
})
export class PublicProfileComponent {
  user: any = {};
  posts: any[] = [];
  isFollowing: boolean = false;
  loggedInUserId: string | null = null;
  userId: string | null = null;
  followers!: number;
  following!: number;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.loggedInUserId = sessionStorage.getItem('userId');
    this.userId = this.route.snapshot.paramMap.get('id');
    if (this.userId) {
      this.getUser( this.userId);
      this.getUserPosts(this.userId);
    }
  }

  getUser(userId: string) {
    this.userService.getUser(userId).subscribe((response) => {
      this.user = response;
      this.followers = this.user.followersCount;
      this.following = this.user.followingCount;
      this.checkIfFollowing(userId);
    });
  }

  getUserPosts(userId: string): void {
   
  }

  checkIfFollowing(userId: string): void {
   
  }

  followUser(): void {
    if (this.loggedInUserId) {
      this.userService.followUser(this.loggedInUserId, this.user.id).subscribe(() => {  
      });
      window.location.reload();
    }
  }

  unfollowUser(): void {
    if (this.loggedInUserId) {
      this.userService.unfollowUser(this.loggedInUserId, this.user.id).subscribe(() => {
        
      });
      window.location.reload();
    }
  }
}
