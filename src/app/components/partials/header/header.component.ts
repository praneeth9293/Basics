import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from 'src/app/services/login.service';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-header',
  providers: [Location, { provide: LocationStrategy, useClass: PathLocationStrategy }],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  router: Router;
  cartService: CartService;
  loginService: LoginService;
  loggedIn: boolean = false;
  isAdmin: boolean = false;
  username: string = "";
  name: string = "";
  cartQuantity = 0;
  showLogin: boolean = false;

  constructor(cartService: CartService, router: Router, loginService: LoginService) {
    this.cartService = cartService;
    this.loginService = loginService;
    this.router = router;

    cartService.getCartObservable().subscribe((newCart) => {
      this.cartQuantity = newCart.totalCount;
    })

    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.showLogin = !val.url.includes("login")
      }
    })

    loginService.isLoggedInListner().subscribe(isUserLoggedIn => {
      this.loggedIn = isUserLoggedIn
    })

    loginService.getUsername().subscribe(username => {
      this.username = username
    })

    loginService.getName().subscribe(name => {
      this.name = name
    })

    loginService.IsAdminListner().subscribe(isAdmin => {
      this.isAdmin = isAdmin
    })
  }

  logoutUser() {
    this.loginService.logoutUser();
    this.cartService.clearCart();
    this.router.navigate(["/login"])
  }

  ngOnInit() {
  }

}
