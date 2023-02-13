import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { referentialService } from 'src/app/services/referential/referential.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { countries } from 'src/app/models/profile/countries';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})



export class ProfileComponent implements AfterViewInit {
  countryData: any = [];
  datasource: any;
  selection: any;
  displayedColumns: string[] = ['alpha code', 'name'];
  loading: boolean = true;



  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngAfterViewInit() {
    this.getCountries();
    //this.datasource.paginator = this.paginator;
  }

  constructor(private referentialService: referentialService) { }

  ngOnInit(): void {

  }

  getCountries() {
    this.referentialService.getCountries().subscribe((res) => {
      this.loading = false;

      this.datasource = new MatTableDataSource(res.data.countries);
      this.datasource.sort = this.sort;
      this.datasource.paginator = this.paginator;
      this.selection = new SelectionModel<any>(true, []);
      console.log(this.datasource);
    })
  }

}



const ELEMENT_DATA: countries[] = [{ alpha2Code: '', shortName: '' }]
