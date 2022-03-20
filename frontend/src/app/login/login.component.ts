import { Component, OnInit } from '@angular/core';
import {AuthService, Credentials} from "../auth.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  error?: string
  credentials: Credentials = {username: '', password: ''};

  constructor(private auth: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  login() {
    this.auth.authenticate(this.credentials).subscribe((success) => {
      if(success) {
        this.router.navigateByUrl('/');
      } else {
        this.error = "Username or password incorrect"
      }
    });
    return false;
  }

}
