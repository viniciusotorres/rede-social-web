import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActionPanelComponent } from '../action-panel/action-panel.component';
import { CommonModule, DatePipe } from '@angular/common';
import { FeedService } from '../../../core/service/internal/feed/feed.service';

interface Post {
  id: number;
  content: string;
  dislikes: number;
  createdAt: string;
  likes: { id: number; user_id: number }[];
  comments: any[];
  user_id: number;
  name: string;
  photo?: string;
}

@Component({
  selector: 'app-card-post-feed',
  standalone: true,
  imports: [ActionPanelComponent, CommonModule],
  templateUrl: './card-post-feed.component.html',
  styleUrls: ['./card-post-feed.component.scss'],
  providers: [DatePipe]
})
export class CardPostFeedComponent implements OnInit {
  @Input() post!: Post; 
  @Output() postUpdated = new EventEmitter<void>();
  @Output() postDeleted = new EventEmitter<number>();

  userPhoto: string = ''; 
  userName: string = '';
  content: string = '';
  createdAt: string = '';
  likesCount: number = 0;
  dislikesCount: number = 0;
  commentsCount: number = 0;
  likedByUser: boolean = false;

  constructor(private datePipe: DatePipe, private feedService: FeedService) { }

  ngOnInit(): void {
    this.initializePostData();
  }

  private initializePostData(): void {
    if (this.post) {
      try {   
        this.content = this.post.content; 
      } catch (error) {
        console.error('Error parsing post content', error);
        this.content = this.post.content; 
      }
      this.userPhoto = this.post.photo ? `data:image/jpeg;base64,${this.post.photo}` : ''; 
      this.userName = this.post.name || this.userName;

      this.createdAt = this.datePipe.transform(this.post.createdAt, 'HH:mm') || '';

     
      this.likesCount = this.post.likes.length;
      this.dislikesCount = this.post.dislikes;
      this.commentsCount = this.post.comments.length;
      const userId = sessionStorage.getItem('userId');
      this.likedByUser = this.post.likes.some(like => like.user_id === Number(userId));
    }
  }

  onLikeUpdated(): void {
    this.postUpdated.emit();
  }

  deletePost(): void {
    this.feedService.deletePost(this.post.id).subscribe(
      (response: any) => {
        console.log('Post deleted successfully', response);
        this.postDeleted.emit(this.post.id);
      },
      (error: any) => {
        console.error('Error deleting post', error);
      }
    );
  }

  isPostOwner(): boolean {
    const userId = sessionStorage.getItem('userId');
    return this.post.user_id === Number(userId);
  }
}