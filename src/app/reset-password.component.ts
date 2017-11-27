import { Component } from '@angular/core';

import { UserService } from './user.service';

@Component({
    selector: 'app-reset-password',
    templateUrl: '/reset-password.component.html',
    providers: [UserService]
})
export class ResetPasswordComponent {
    validationKey = '';
    password = '';
    confirmPassword = '';
    invalidKey = false;
    invalidPassword = false;
    emptyPwdConfirm = false;
    pwdMatch = true;

    constructor(private userService: UserService) { }

    onSubmit(): void {
        if(this.validateUserInput()) {
            this.resetPassword();
            document.getElementById("redirect-home").click();
        }
    }

    resetPassword(): void {
        this.validationKey = this.validationKey.trim();
        this.password = this.password.trim();
        if(!this.validationKey || !this.password) { return; }
        this.userService.resetPassword(this.validationKey, this.password).then(function(res) {
            if (res == 'failure') {
                window.alert("Failed to reset password. Please try again by selecting 'Forgot Password?' on the Home screen and entering your email address.");
            }
        });
    }

    validateUserInput(): Boolean {
        this.validationKey = this.validationKey.trim();
        this.password = this.password.trim();
        this.confirmPassword = this.confirmPassword.trim();
        this.invalidKey = !this.validateKey(this.validationKey);
        this.invalidPassword = !this.validatePassword(this.password);
        this.emptyPwdConfirm = !this.confirmPassword;
        this.pwdMatch = this.emptyPwdConfirm || (this.password == this.confirmPassword);
        return !this.invalidKey && !this.invalidPassword && this.pwdMatch && !this.emptyPwdConfirm;
    }

    validateKey(key: String): Boolean {
        return !!key;
    }

    validatePassword(password: String): Boolean {
        return password.length >= 8;
    }
}
