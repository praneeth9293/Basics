import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-credentials',
  templateUrl: './credentials.component.html',
  styleUrls: ['./credentials.component.css']
})
export class CredentialsComponent implements OnInit {
  loginService!: LoginService;
  user = new User();
  error: string = "";

  constructor(loginService: LoginService, private router: Router) {
    this.loginService = loginService
  }

  validate(): any {
    let isValid = this.loginService.validateUser(this.user.username, this.user.password);
    if (isValid) {
      this.error = "";
      this.router.navigate(['/'])
    }
    else {
      this.error = "Invalid cerdentials!!!"
    }
  }
  ngOnInit(): void {
  }

}
