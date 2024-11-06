import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FeedService } from '../../../core/service/internal/feed/feed.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-action-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './action-panel.component.html',
  styleUrls: ['./action-panel.component.scss']
})
export class ActionPanelComponent implements OnInit {
  @Input() likesCount: number = 0;
  @Input() dislikesCount: number = 0;
  @Input() commentsCount: number = 0;
  @Input() postId!: string;
  @Input() likedByUser: boolean = false;
  @Output() likeUpdated = new EventEmitter<number>();
  likes: any[] = [];
  dislikes: any[] = [];
  showLikes: boolean = false;
  showDislikes: boolean = false;
  loggedInUserId: number = Number(sessionStorage.getItem('userId'));

  constructor(private feedService: FeedService) {}

  ngOnInit(): void {
    this.loadLikes();
    this.loadDislikes();
  }

  toggleLike(): void {
    if (this.likedByUser) {
      this.takeLikeFromPost();
    } else {
      this.likePost();
    }
  }

  toggleDislike(): void {
    if (this.dislikes.some(dislike => dislike.userId === this.loggedInUserId)) {
      this.takeDeslikeFromPost();
    } else {
      this.deslikePost();
    }
  }

  likePost(): void {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      this.feedService.likePost(Number(this.postId)).subscribe(
        (response: any) => {
          this.likeUpdated.emit();
        },
        (error: any) => {
          console.error('Error liking post', error);
        }
      );
    } else {
      console.error('No user ID found in sessionStorage');
    }
  }

  takeLikeFromPost(): void {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      this.feedService.unlike(Number(this.postId)).subscribe(
        (response: any) => {
          this.likeUpdated.emit();
        },
        (error: any) => {
          console.error('Error disliking post', error);
        }
      );
    } else {
      console.error('No user ID found in sessionStorage');
    }
  }

  takeDeslikeFromPost(): void {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      this.feedService.undeslikePost(Number(this.postId)).subscribe(
        (response: any) => {
          this.likeUpdated.emit();
        },
        (error: any) => {
          console.error('Error disliking post', error);
        }
      );
    } else {
      console.error('No user ID found in sessionStorage');
    }
  }

  deslikePost(): void {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      this.feedService.deslikePost(Number(this.postId)).subscribe(
        (response: any) => {
          this.likeUpdated.emit();
        },
        (error: any) => {
          console.error('Error disliking post', error);
        }
      );
    } else {
      console.error('No user ID found in sessionStorage');
    }
  }

  toggleLikesList(): void {
    this.showLikes = !this.showLikes;
    if (this.showLikes) {
      this.loadLikes();
    }
  }

  toggleDislikesList(): void {
    this.showDislikes = !this.showDislikes;
    if (this.showDislikes) {
      this.loadDislikes();
    }
  }

  private loadLikes(): void {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      this.feedService.listLikes(Number(userId), Number(this.postId)).subscribe(
        (data: any) => {
          this.likes = data.likes;
        },
        (error: any) => {
          console.error('Error loading likes', error);
        }
      );
    } else {
      console.error('No user ID found in sessionStorage');
    }
  }

  private loadDislikes(): void {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      this.feedService.listDeslikes(Number(userId), Number(this.postId)).subscribe(
        (data: any) => {
          this.dislikes = data.dislikes;
        },
        (error: any) => {
          console.error('Error loading dislikes', error);
        }
      );
    } else {
      console.error('No user ID found in sessionStorage');
    }
  }

  getDislikeClasses(): any {
    return {
      'text-red-500': this.dislikes.some(dislike => dislike.userId === this.loggedInUserId),
      'hover:text-red-500': !this.dislikes.some(dislike => dislike.userId === this.loggedInUserId),
      'transform hover:scale-125 transition duration-200': true
    };
  }
}