import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/service/internal/user/user.service';
import { CommonModule } from '@angular/common';
import { FeedService } from '../../../core/service/internal/feed/feed.service';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProfileViewDTO } from '../../../core/models/profile.interface';
import { ProfileService } from '../../../core/service/internal/profile/profile.service';
import { Router } from '@angular/router';

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

  constructor(
    private router: Router,
    private userService: UserService,
    private feedService: FeedService,
    private profileService: ProfileService
  ) { }

  /**
   * Método chamado quando o componente é inicializado.
   * Obtém o ID do usuário logado e carrega os dados do usuário, últimos posts e métricas do perfil.
   */
  ngOnInit() {
    this.loggedInUserId = sessionStorage.getItem('userId');
    if (this.loggedInUserId) {
      this.bringUser(this.loggedInUserId);
      this.loadLastPosts(Number(this.loggedInUserId));
      this.loadProfileMetrics(Number(this.loggedInUserId));
    }
  }

  /**
   * Obtém os dados do usuário.
   * @param userId - ID do usuário.
   */
  bringUser(userId: string) {
    this.userService.getUser(userId).subscribe((response) => {
      this.user = response;
    });
  }

  /**
   * Carrega os últimos posts do usuário.
   * @param userId - ID do usuário.
   */
  loadLastPosts(userId: number) {
    this.feedService.getLastPosts(userId).subscribe((response) => {
      this.lastPosts = response.posts;
    });
  }

  /**
   * Carrega as métricas do perfil do usuário, incluindo visualizações de perfil e visualizadores recentes.
   * @param userId - ID do usuário.
   */
  loadProfileMetrics(userId: number) {
    this.profileService.getViewProfileById(userId).subscribe((response: ProfileViewDTO) => {
      this.profileViews = response.viewers.length;
      this.recentViewers = response.viewers.map(viewer => ({
        id: viewer.id,
        name: viewer.name,
        photoUrl: 'https://via.placeholder.com/40' 
      }));
    });
  }

  /**
   * Alterna entre perfis de usuários.
   * @param userId - ID do usuário.
   */
  switchUser(userId: string) {
    this.isViewingOwnProfile = this.loggedInUserId === userId;
    this.bringUser(userId);
    this.loadLastPosts(Number(userId));
    this.loadProfileMetrics(Number(userId));
  }

  goToUserProfile(userId: string): void {
    const storedUserId = sessionStorage.getItem('userId');
    const numericStoredUserId = storedUserId ? parseInt(storedUserId, 10) : null;

    if (numericStoredUserId === parseInt(userId, 10)) {
      this.router.navigate(['/feed/perfil', userId]);
    } else {
      this.router.navigate(['/feed/perfil-pub', userId]);
    }
  }
}