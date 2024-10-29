import { Component } from '@angular/core';
import { CardSelfFeedComponent } from "../../../shared/components/card-self-feed/card-self-feed.component";
import { CardPostFeedComponent } from "../../../shared/components/card-post-feed/card-post-feed.component";
import { FeedService } from '../../../core/service/internal/feed/feed.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/service/auth/auth.service';
import { UserService } from '../../../core/service/internal/user/user.service';
import { MatTooltipModule, TooltipComponent } from '@angular/material/tooltip';

@Component({
  selector: 'app-feed-principal',
  standalone: true,
  imports: [CardSelfFeedComponent, CardPostFeedComponent, CommonModule, MatTooltipModule],
  templateUrl: './feed-principal.component.html',
  styleUrl: './feed-principal.component.scss'
})
export class FeedPrincipalComponent {
  postsTopper: any[] = [];
  usersTopper: any[] = [];

  loggedInUser = {
    userId : 1,
    userName: 'Logged In User',
    email: 'user@example.com',
    followersCount: 150,
    followingCount: 100,
    postsCount: 50,
    profilePicture: 'https://via.placeholder.com/150',
    status: sessionStorage.getItem('token') ? 'Online' : 'Offline',
    reach: 5000
  };

  private loginEventSubscription!: Subscription;

  posts: any[] = [];

  constructor(private feedService: FeedService, private auth: AuthService, private user: UserService) { }

  ngOnInit(): void {
    this.loadUserProfile();
    this.loadFeed();
    this.loadTopPosts();
    this.loadTopUsers();
    this.loginEventSubscription = this.auth.getLoginEvent().subscribe(() => {
      this.loadUserProfile();
      this.loadFeed();
      this.loadTopPosts();
      this.loadTopUsers();
    });
  }

  private loadUserProfile(): void {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      this.user.getUser(userId).subscribe(
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

  private loadFeed(): void {
    this.feedService.bringFeed().subscribe(
      (data: any) => {
        if (data && Array.isArray(data.posts)) {
          this.posts = data.posts;
        } else {
          console.error('Expected an array of posts');
        }
      },
      (error: any) => {
        console.error('Error fetching feed:', error);
      }

    );
  }

  private loadTopPosts(): void {
    this.feedService.bringTopPosts().subscribe(
      (data: any) => {
        if (data && Array.isArray(data.topPosts)) {
          this.postsTopper = data.topPosts;
        } else {
          console.error('Expected an array of top posts');
        }
      },
      (error: any) => {
        console.error('Error fetching top posts:', error);
      }
    );
  }


  private loadTopUsers(): void {
    this.feedService.bringTopUsers().subscribe(
      (data: any) => {
        if (data && Array.isArray(data)) {
          this.usersTopper = data;
        } else {
          console.error('Expected an array of top users');
        }
      },
      (error: any) => {
        console.error('Error fetching top users:', error);
      }
    );
  }

  onPostUpdated(): void {
    this.loadFeed();
    this.loadTopPosts();
  }

  postCreated(): void {
    this.loadFeed();
    this.loadTopPosts();
  }

  postDeleted(): void {
    this.loadFeed();
    this.loadTopPosts();
  }

}

