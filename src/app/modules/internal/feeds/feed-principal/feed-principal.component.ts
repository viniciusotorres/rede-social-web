import { Component } from '@angular/core';
import { CardSelfFeedComponent } from "../../../shared/components/card-self-feed/card-self-feed.component";
import { CardPostFeedComponent } from "../../../shared/components/card-post-feed/card-post-feed.component";
import { FeedService } from '../../../core/service/internal/feed/feed.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/service/auth/auth.service';

@Component({
  selector: 'app-feed-principal',
  standalone: true,
  imports: [CardSelfFeedComponent, CardPostFeedComponent, CommonModule],
  templateUrl: './feed-principal.component.html',
  styleUrl: './feed-principal.component.scss'
})
export class FeedPrincipalComponent {
  postsTopper: any[] = [];
  usersTopper: any[] = [];
  
  loggedInUser = {
    name: 'Logged In User',
    email: 'user@example.com',
    followers: 150,
    following: 100,
    posts: 50,
    profilePicture: 'https://via.placeholder.com/150',
    status: 'Online',
    reach: 5000
  };

  private loginEventSubscription!: Subscription;

  posts: any[] = [];

  constructor(private feedService: FeedService, private auth: AuthService) { }

  ngOnInit(): void {
    this.loadFeed();
    this.loadTopPosts();
    this.loadTopUsers();
    this.loginEventSubscription = this.auth.getLoginEvent().subscribe(() => {
      this.loadFeed();
      this.loadTopPosts();
      this.loadTopUsers();
    });
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

