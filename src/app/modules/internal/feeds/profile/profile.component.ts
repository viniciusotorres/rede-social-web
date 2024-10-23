import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/service/internal/user/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  user: any = {};
  
  constructor(private userService: UserService) { }

  ngOnInit() {
    const userId = sessionStorage.getItem('userId');
    if (userId){
      this.bringUser(userId);
    }
  }

  bringUser(userId: string) {
  this.userService.getUser(userId).subscribe((response) => {
    this.user = response;
  });
  }

}
