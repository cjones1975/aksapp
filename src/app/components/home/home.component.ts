import { Component, OnInit } from '@angular/core';
import { testService } from 'src/app/services/test.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private testService: testService) { }

  ngOnInit(): void {
    this.doTest()
  }

  public doTest() {
    try {
      this.testService.getTest().subscribe((res) => {
        console.log(res);
      });
    } catch (err: any) {
      console.log(`Error message is ${err.message}`);
    }
  }

}
