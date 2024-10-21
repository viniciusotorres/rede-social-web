import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-action-panel',
  standalone: true,
  imports: [],
  templateUrl: './action-panel.component.html',
  styleUrl: './action-panel.component.scss'
})
export class ActionPanelComponent {
  @Input() likesCount: number = 0;
  @Input() dislikesCount: number = 0;
  @Input() commentsCount: number = 0;
}
