import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FeedService } from '../../../core/service/internal/feed/feed.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-action-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './action-panel.component.html',
  styleUrl: './action-panel.component.scss'
})
export class ActionPanelComponent {
  @Input() likesCount: number = 0;
  @Input() dislikesCount: number = 0;
  @Input() commentsCount: number = 0;
  @Input() postId!: string;
  @Input() likedByUser: boolean = false;
  @Output() likeUpdated = new EventEmitter<number>();


  constructor(private feedService: FeedService) {}

  toggleLike(): void {
    if (this.likedByUser) {
      this.dislikePost();
    } else {
      this.likePost();
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

  dislikePost(): void {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      this.feedService.dilikePost(Number(this.postId)).subscribe(
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
}
