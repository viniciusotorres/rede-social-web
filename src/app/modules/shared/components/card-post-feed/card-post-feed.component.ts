import { Component } from '@angular/core';
import { ActionPanelComponent } from '../action-panel/action-panel.component';

@Component({
  selector: 'app-card-post-feed',
  standalone: true,
  imports: [ActionPanelComponent],
  templateUrl: './card-post-feed.component.html',
  styleUrl: './card-post-feed.component.scss'
})
export class CardPostFeedComponent {

}
