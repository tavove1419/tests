import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
// Local imports
import {User} from '../model/user';

@Injectable({
    providedIn: 'root'
})

export class UserService {
    private baseUrl = 'http://localhost:8000/users';

    constructor(private http: HttpClient) { }

    get(name: string): Observable<User> {
        return this.http.get<any>(this.baseUrl + '/' + name);
    }

    getAll(): Observable<User[]> {
        return this.http.get<any>(this.baseUrl);
    }
    
}