import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { users } from 'src/users';
import { Cart } from '../shared/models/Cart';
import { User } from '../shared/models/User';
import { CartService } from './cart.service';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    cartService!: CartService;
    private username: BehaviorSubject<string> = new BehaviorSubject("");
    private name: BehaviorSubject<string> = new BehaviorSubject("");
    private isAdmin: BehaviorSubject<boolean> = new BehaviorSubject(false as boolean);
    private isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false as boolean);

    constructor(cartService: CartService) {
        this.cartService = cartService;
        this.initializeUserDetails();
    }

    validateUser(username: string, password: string): boolean {
        const _user = users.find(user =>
            user.username === username &&
            user.password === password
        )
        console.log(users, username, password, _user)
        if (_user) {
            this.isUserLoggedIn.next(true);
            this.username.next(_user.username);
            this.name.next(_user.name);
            this.isAdmin.next(_user.isAdmin);
            this.setUserToLocalStorage(_user);
            this.cartService.clearCart();
            return true;
        }
        return false;
    }

    logoutUser() {
        this.isUserLoggedIn.next(false);
        this.username.next("");
        this.name.next("");
        this.isAdmin.next(false);
        this.setUserToLocalStorage(new User());
    }

    isLoggedInListner(): Observable<boolean> {
        return this.isUserLoggedIn.asObservable();
    }

    isLoggedIn(): boolean {
        return this.isUserLoggedIn.getValue();
    }

    IsAdminListner(): Observable<boolean> {
        return this.isAdmin.asObservable();
    }

    IsAdmin(): boolean {
        return this.isAdmin.getValue();
    }

    getUsername(): Observable<string> {
        return this.username.asObservable();
    }

    getName(): Observable<string> {
        return this.name.asObservable();
    }

    private initializeUserDetails(): void {
        const userDetails = localStorage.getItem('user');
        const parsedUser = userDetails ? JSON.parse(userDetails) : new User();
        this.isAdmin.next(parsedUser.isAdmin)
        this.username.next(parsedUser.username)
        this.name.next(parsedUser.name);
        this.isUserLoggedIn.next(!!parsedUser.username)
    }

    private setUserToLocalStorage(user: User): void {
        const { password, ...sharableUser } = user
        const userDetails = JSON.stringify(sharableUser);
        localStorage.setItem('user', userDetails);
    }

}
