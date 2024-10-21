import { Component } from '@angular/core';
import { CardSelfFeedComponent } from "../../../shared/components/card-self-feed/card-self-feed.component";
import { CardPostFeedComponent } from "../../../shared/components/card-post-feed/card-post-feed.component";

@Component({
  selector: 'app-feed-principal',
  standalone: true,
  imports: [CardSelfFeedComponent, CardPostFeedComponent],
  templateUrl: './feed-principal.component.html',
  styleUrl: './feed-principal.component.scss'
})
export class FeedPrincipalComponent {

}
