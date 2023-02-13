import { Component, OnInit } from '@angular/core';
import { authService } from 'src/app/services/auth/auth.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['claim', 'value', 'description'];
  dataSource: any = [];

  constructor(
    private authService: authService,
  ) { }

  ngOnInit(): void {
    this.authService.msalSubject$Event();

    this.authService.msalProgress$Event();

    this.authService.IsLoggedIn.subscribe((res: boolean) => {
      if (res) {
        this.dataSource = this.authService.dataSource;
      }
    })

  }



}
