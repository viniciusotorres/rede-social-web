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
  private loginEventSubscription!: Subscription;

  posts: any[] = [];

  constructor(private feedService: FeedService, private auth: AuthService) { }

  ngOnInit(): void {
    this.loadFeed();
    this.loginEventSubscription = this.auth.getLoginEvent().subscribe(() => {
      this.loadFeed();
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

}

