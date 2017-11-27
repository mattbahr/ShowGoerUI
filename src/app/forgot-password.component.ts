import { Component } from '@angular/core';

import { UserService } from './user.service';

@Component({
    selector: 'app-forgot-password',
    templateUrl: '/forgot-password.component.html',
    providers: [UserService]
})
export class ForgotPasswordComponent {

    email = '';
    invalidEmail = false;

    constructor(private userService: UserService) { }

    onSubmit(): void {
        if(this.validateUserInput()) {
            this.requestPasswordResetLink();
        }
    }

    onDismiss(): void {
        this.resetData();
    }

    requestPasswordResetLink(): void {
        this.email = this.email.trim();
        if(!this.email) { return; }
        this.userService.requestPasswordResetLink(this.email).then(function(res) {
            if(res == 'failure') {
                window.alert("Failed to request a password reset link. Please try again later.");
            } else {
                window.alert(res);

                if(res == 'A link to reset your password has been sent to your email.') {
                    document.getElementById('redirect-button').click();
                }
            }
        });
        document.getElementById('cancel-button').click();
    }

    validateUserInput(): Boolean {
        this.invalidEmail = !this.validateEmail(this.email);
        return !this.invalidEmail;
    }

    validateEmail(email): Boolean {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    resetData(): void {
        this.email = '';
        this.invalidEmail = false;
    }
}
