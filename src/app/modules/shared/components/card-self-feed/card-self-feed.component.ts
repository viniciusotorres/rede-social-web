import { Component, EventEmitter, Output } from '@angular/core';
import { ActionPanelComponent } from '../action-panel/action-panel.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FeedService } from '../../../core/service/internal/feed/feed.service';

@Component({
  selector: 'app-card-self-feed',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ActionPanelComponent],
  templateUrl: './card-self-feed.component.html',
  styleUrls: ['./card-self-feed.component.scss']
})
export class CardSelfFeedComponent {
  postForm: FormGroup;
  @Output() postCreated = new EventEmitter<any>();

  constructor(private fb: FormBuilder, private feedService: FeedService) {
    this.postForm = this.fb.group({
      content: ['']
    });
  }

  onSubmit(): void {
    if (this.postForm.valid) {
      const content = this.postForm.get('content')?.value;
      this.feedService.createPost(content).subscribe(
        (response: any) => {
          console.log('Post created successfully', response);
          this.postForm.reset();
          this.postCreated.emit();
        },
        (error: any) => {
          console.error('Error creating post', error);
        }
      );
    }
  }
}