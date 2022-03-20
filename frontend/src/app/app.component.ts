import { Component } from '@angular/core';
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {finalize} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Tour of Heroes'

  constructor(private auth: AuthService, private router: Router) {}

  authenticated() { return this.auth.authenticated; }

  logout() {
    this.auth.logout().pipe(finalize(() => {
      this.router.navigateByUrl('/login');
    }))

  }
}
