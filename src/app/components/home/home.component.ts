import { Component, OnInit } from '@angular/core';
import { authService } from 'src/app/services/auth/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(
    private authService: authService
  ) { }

  ngOnInit(): void {
    this.authService.msalSubject$Event();

    this.authService.msalProgress$Event();
  }

  // public doTest() {
  //   try {
  //     this.testService.getTest().subscribe((res) => {
  //       console.log(res);
  //     });
  //   } catch (err: any) {
  //     console.log(`Error message is ${err.message}`);
  //   }
  // }

}
