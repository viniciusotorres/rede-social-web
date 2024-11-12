import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/service/internal/user/user.service';
import { CommonModule } from '@angular/common';
import { FeedService } from '../../../core/service/internal/feed/feed.service';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, CarouselModule, MatTooltipModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any = {};
  loggedInUserId: string | null = null;
  isViewingOwnProfile: boolean = true;
  lastPosts: any[] = [];
  profileViews: number = 0;
  recentViewers: any[] = [];

  constructor(private userService: UserService, private feedService: FeedService) { }

  ngOnInit() {
    this.loggedInUserId = sessionStorage.getItem('userId');
    if (this.loggedInUserId) {
      this.bringUser(this.loggedInUserId);
      this.loadLastPosts(Number(this.loggedInUserId));
      this.loadProfileMetrics(Number(this.loggedInUserId));
    }
  }

  bringUser(userId: string) {
    this.userService.getUser(userId).subscribe((response) => {
      this.user = response;
    });
  }

  loadLastPosts(userId: number) {
    this.feedService.getLastPosts(userId).subscribe((response) => {
      this.lastPosts = response.posts;
    });
  }

  loadProfileMetrics(userId: number) {
    // Dados falsos das métricas do perfil
    this.profileViews = 250;
    this.recentViewers = [
      { name: 'Alice', photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnw4H_AYUZ9mLxRmLRiEQZQz9I29O0kHKNQQ&s' },
      { name: 'Fernada', photoUrl: 'https://wl-incrivel.cf.tsp.li/resize/728x/jpg/0ec/140/d189845022bb6eddb88bb5279a.jpg' },
      { name: 'Gabriel', photoUrl: 'https://img.freepik.com/fotos-gratis/retrato-de-homem-branco-isolado_53876-40306.jpg' },
      { name: 'Alice', photoUrl: 'https://via.placeholder.com/40' },
      { name: 'Bob', photoUrl: 'https://via.placeholder.com/40' },
      { name: 'Charlie', photoUrl: 'https://via.placeholder.com/40' }
    ];
  }

  // Método para alternar entre perfis
  switchUser(userId: string) {
    this.isViewingOwnProfile = this.loggedInUserId === userId;
    this.bringUser(userId);
    this.loadLastPosts(Number(userId));
    this.loadProfileMetrics(Number(userId));
  }
}