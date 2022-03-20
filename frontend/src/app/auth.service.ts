import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MessageService} from "./message.service";
import {finalize, map, Observable} from "rxjs";

export interface Credentials {
  username: string
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private messageService: MessageService) { }

  authenticated = false;

  authenticate(credentials: Credentials): Observable<boolean> {
    const headers = new HttpHeaders(credentials ? {
      authorization : 'Basic ' + btoa(credentials.username + ':' + credentials.password)
    } : {});

    return this.http.get<{name: string}>('http://localhost:8080/api/user', {headers: headers}).pipe(map(response => {
      this.authenticated = !!response['name'];
      return this.authenticated;
    }));
  }

  logout() {
    return this.http.post('http://localhost:8080/logout', {}).pipe(finalize(() => {
      this.authenticated = false;
    }));
  }
}
