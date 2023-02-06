import { Component, OnInit } from '@angular/core';
import { authService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'aks-app';

  constructor(

    private authService: authService
  ) { }

  ngOnInit(): void {

    this.authService.msalProgress$Event();

  }
}
