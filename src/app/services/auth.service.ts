import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private readonly defaultUsername = 'admin';
    private readonly defaultPassword = '12345678';
    isAuthenticated = false;

    constructor()
    {
        this.isAuthenticate();
    }

    login(username: string, password: string): boolean {
        if (username === this.defaultUsername && password === this.defaultPassword) {
            this.isAuthenticated = true;
            return true;
        }

        return false;
    }

    logout(): void {
        this.isAuthenticated = false;
    }

    isAuthenticate() {
        const auth = localStorage.getItem('isLogin') ? localStorage.getItem('isLogin') : '0';
        this.isAuthenticated = auth == '1' ? true : false;
    }
}