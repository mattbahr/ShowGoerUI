
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login.component';
import { ResetPasswordComponent } from './reset-password.component';

const routes: Routes = [
    { path: '' , component: LoginComponent },
    { path: 'reset-password', component: ResetPasswordComponent }
];

@NgModule({
    exports: [ RouterModule ],
    imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule { }
