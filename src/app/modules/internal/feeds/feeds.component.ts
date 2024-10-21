import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-feeds',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './feeds.component.html',
  styleUrl: './feeds.component.scss'
})
export class FeedsComponent {

}
