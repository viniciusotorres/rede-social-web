import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'side-info-metrics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './side-info-metrics.component.html',
  styleUrl: './side-info-metrics.component.scss'
})
export class SideInfoMetricsComponent {
  @Input() postsTopper: any[] = [];
  @Input() usersTopper: any[] = [];
  @Input() loggedInUser: any;
}
