import { Component } from '@angular/core';
import { ActionPanelComponent } from "../action-panel/action-panel.component";

@Component({
  selector: 'app-card-self-feed',
  standalone: true,
  imports: [ActionPanelComponent],
  templateUrl: './card-self-feed.component.html',
  styleUrl: './card-self-feed.component.scss'
})
export class CardSelfFeedComponent {

}
