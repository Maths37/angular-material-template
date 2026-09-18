import {Component, inject, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Router} from '@angular/router';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {AuthenticationService} from 'src/app/core/services/auth.service';
import {NotificationService} from 'src/app/core/services/notification.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class LoginComponent implements OnInit {
    loginForm!: UntypedFormGroup;
    loading!: boolean;
    private router = inject(Router);
    private titleService = inject(Title);
    private notificationService = inject(NotificationService);
    private authenticationService = inject(AuthenticationService);

    ngOnInit() {
        this.titleService.setTitle('angular-material-template - Login');
        this.authenticationService.logout();
        this.createForm();
    }

    login() {
        const email = this.loginForm.get('email')?.value;
        const password = this.loginForm.get('password')?.value;
        const rememberMe = this.loginForm.get('rememberMe')?.value;

        this.loading = true;
        this.authenticationService
            .login(email.toLowerCase(), password)
            .subscribe({
                next: (authenticated) => {
                    if (authenticated) {
                        if (rememberMe) {
                            localStorage.setItem('savedUserEmail', email);
                        } else {
                            localStorage.removeItem('savedUsername');
                        }
                        this.loading = false;
                        this.router
                            .navigateByUrl('/home')
                            .then(_ => {

                            });
                    } else {
                        this.notificationService.openSnackBar('login failed');
                        this.loading = false;
                    }
                },
                error: (error) => {
                    this.notificationService.openSnackBar(error.error);
                    this.loading = false;
                }
            });
    }

    resetPassword() {
        this.router.navigate(['/auth/password-reset-request']);
    }

    private createForm() {
        const savedUserEmail = localStorage.getItem('savedUserEmail');

        this.loginForm = new UntypedFormGroup({
            email: new UntypedFormControl(savedUserEmail, [Validators.required, Validators.email]),
            password: new UntypedFormControl('', Validators.required),
            rememberMe: new UntypedFormControl(savedUserEmail !== null)
        });
    }
}
