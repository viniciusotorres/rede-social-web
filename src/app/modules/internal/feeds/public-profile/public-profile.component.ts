import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../core/service/internal/user/user.service';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../../core/service/internal/profile/profile.service';
import { ViewProfileDTO } from '../../../core/models/profile.interface';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-public-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.scss']
})
export class PublicProfileComponent implements OnInit {
  user: any = {};
  posts: any[] = [];
  isFollowing: boolean = false;
  loggedInUserId: string | null = null;
  userId: string = '';
  followers!: number;
  following!: number;
  commonFriends: any[] = [];
  recentActivities: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private profileService: ProfileService 
  ) {}

  ngOnInit(): void {
    this.loggedInUserId = sessionStorage.getItem('userId');
    this.userId = this.route.snapshot.paramMap.get('id')!;
    if (this.userId) {
      this.getUser(this.userId);
      this.getUserPosts(this.userId);
      this.registerProfileView(); 
      this.getCommonFriends();
      this.getRecentActivities();
    }
  }

  getUser(userId: string) {
    this.userService.getUser(userId).subscribe((response) => {
      this.user = response;
      this.followers = this.user.followersCount;
      this.following = this.user.followingCount;
      this.checkIfFollowing(userId);
    });
  }

  getUserPosts(userId: string): void {
    // Implementação para obter os posts do usuário
  }

  checkIfFollowing(userId: string): void {
    if (this.loggedInUserId) {
      this.userService.isFollowing(this.loggedInUserId, userId).subscribe((response: boolean) => {
        this.isFollowing = response;
      });
    }
  }

  followUser(): void {
    if (this.loggedInUserId) {
      this.userService.followUser(this.loggedInUserId, this.userId).pipe(
        tap(() => {
          console.log('User followed successfully');
          this.getUser(this.userId);
        })
      ).subscribe({
        error: (error) => {
          console.error('An unexpected error occurred', error);
        }
      });
    }
  }

  unfollowUser(): void {
    if (this.loggedInUserId) {
      this.userService.unfollowUser(this.loggedInUserId, this.userId).pipe(
        tap(() => {
          console.log('User unfollowed successfully');
          this.getUser(this.userId);
        })
      ).subscribe({
        error: (error) => {
          console.error('An unexpected error occurred', error);
        }
      });
    }
  }

  sendMessage(): void {
    // Implementação para enviar mensagem
    console.log('Mensagem enviada');
  }

  addToFavorites(): void {
    // Implementação para adicionar aos favoritos
    console.log('Adicionado aos favoritos');
  }

  getCommonFriends(): void {
    // Implementação para obter amigos em comum
    this.commonFriends = [
      { name: 'Alice', photoUrl: 'https://via.placeholder.com/40' },
      { name: 'Bob', photoUrl: 'https://via.placeholder.com/40' },
      { name: 'Charlie', photoUrl: 'https://via.placeholder.com/40' }
    ];
  }

  getRecentActivities(): void {
    // Implementação para obter atividades recentes
    this.recentActivities = [
      { description: 'Postou uma nova foto', date: '2023-10-01' },
      { description: 'Curtiu um post', date: '2023-09-30' },
      { description: 'Comentou em um post', date: '2023-09-29' }
    ];
  }

  private registerProfileView(): void {
    if (this.loggedInUserId && this.userId) {
      const viewProfileDTO: ViewProfileDTO = {
        viewerId: Number(this.loggedInUserId),
        profileOwnerId: Number(this.userId)
      };
      this.profileService.viewProfile(viewProfileDTO, viewProfileDTO.viewerId, viewProfileDTO.profileOwnerId).subscribe({
        next: (response) => {
          console.log('Profile view registered successfully', response);
        },
        error: (error) => {
          console.error('Error registering profile view', error);
        }
      });
    }
  }
}
