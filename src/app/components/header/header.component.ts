import { Component, OnInit } from '@angular/core';
import { authService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: authService) { }
  loginDisplay = false;

  ngOnInit(): void {
    this.loginDisplay = this.authService.loginDisplay;
  }

  logout() {
    this.authService.logout();
  }

}
