import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { protectedResources } from 'src/app/utils/auth/auth-config';

@Injectable()
export class referentialService {
    referentialEndpoint: string = protectedResources.referentialApi.endpoint;
    uri = 'http://20.23.179.197/api/v1/referential/getCountries'
    //baseUrl = environment.baseUrl;

    constructor(private http: HttpClient) { }

    getCountries(): Observable<any> {
        return this.http.get(this.referentialEndpoint);
    }
}