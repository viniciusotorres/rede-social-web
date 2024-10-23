import { Component, Input, OnInit } from '@angular/core';
import { ActionPanelComponent } from '../action-panel/action-panel.component';
import { DatePipe } from '@angular/common';

interface Post {
  id: number;
  content: string;
  dislikes: number;
  createdAt: string;
  likes: any[];
  comments: any[];
  user_id: number;
  name: string;
  photo?: string;
}

@Component({
  selector: 'app-card-post-feed',
  standalone: true,
  imports: [ActionPanelComponent],
  templateUrl: './card-post-feed.component.html',
  styleUrls: ['./card-post-feed.component.scss'],
  providers: [DatePipe]
})
export class CardPostFeedComponent implements OnInit {
  @Input() post!: Post; 
  userPhoto: string = ''; 
  userName: string = '';
  content: string = '';
  createdAt: string = '';
  likesCount: number = 0;
  dislikesCount: number = 0;
  commentsCount: number = 0;

  constructor(private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.initializePostData();
  }

  private initializePostData(): void {
    if (this.post) {
      try {   
        const parsedContent = JSON.parse(this.post.content);
        this.content = parsedContent.content.content;
      } catch (error) {
        console.error('Error parsing post content', error);
        this.content = this.post.content; 
      }
      this.userPhoto = this.post.photo ? `data:image/jpeg;base64,${this.post.photo}` : ''; 
      this.userName = this.post.name || this.userName;

      this.createdAt = this.datePipe.transform(this.post.createdAt, 'short') || '';

     
      this.likesCount = this.post.likes.length;
      this.dislikesCount = this.post.dislikes;
      this.commentsCount = this.post.comments.length;
    }
  }
}