import { Component } from '@angular/core';

import { User } from './user';
import { UserService } from './user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: '/sign-up.component.html',
  providers: [UserService]
})
export class SignUpComponent {

    userTypes = ['User', 'Artist', 'Venue', 'Promoter'];
    model = new User();
    pwdConfirm = '';
    invalidEmail = false;
    invalidPassword = false;
    emptyPwdConfirm = false;
    pwdMatch = true;

    constructor(private userService: UserService) { }

    onSubmit(): void {
        if (this.validateUserInput()) {
            this.addUser();
        }
    }

    addUser(): void {
        this.model.email = this.model.email.trim();
        this.model.password = this.model.password.trim();
        this.model.type = this.model.type.trim();
        if(!this.model.email || !this.model.password || !this.model.type) { return; }
        this.userService.create(this.model).then(function(res) {
            if(res == "success") {
                window.alert("A registration link has been sent to your email.");
            } else if(res == "failure") {
                window.alert("Sign up failed. Please try again later.");
            } else {
                window.alert(res);
            }
        });
        document.getElementById('cancel-btn').click();
    }

    onDismiss(): void {
        this.resetData();
    }

    resetData(): void {
        this.model = new User();
        this.pwdConfirm = '';
        this.invalidEmail = false;
        this.invalidPassword = false;
        this.emptyPwdConfirm = false;
        this.pwdMatch = true;
    }

    validateUserInput(): boolean {
        this.model.email = this.model.email.trim();
        this.model.password = this.model.password.trim();
        this.pwdConfirm = this.pwdConfirm.trim();
        this.invalidEmail = !this.validateEmail(this.model.email);
        this.invalidPassword = !this.validatePassword(this.model.password);
        this.emptyPwdConfirm = !this.pwdConfirm;
        this.pwdMatch = this.emptyPwdConfirm || (this.model.password == this.pwdConfirm);
        return !this.invalidEmail && !this.invalidPassword && this.pwdMatch && !this.emptyPwdConfirm;
    }

    validateEmail(email): boolean {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    validatePassword(password: String): boolean {
        return password.length >= 8
    }
}
