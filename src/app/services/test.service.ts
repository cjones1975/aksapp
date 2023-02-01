import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable()
export class testService {

    baseUrl = environment.baseUrl;

    constructor(
        private http: HttpClient,
    ) { }

    getTest(): Observable<any> {

        return this.http.get(this.baseUrl + `test/test`);
    }


}