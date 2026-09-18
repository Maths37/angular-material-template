import {Router} from '@angular/router';
import {Component, inject, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {Title} from '@angular/platform-browser';

import {NotificationService} from 'src/app/core/services/notification.service';
import {AuthenticationService} from 'src/app/core/services/auth.service';

@Component({
    selector: 'app-password-reset-request',
    templateUrl: './password-reset-request.component.html',
    styleUrls: ['./password-reset-request.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class PasswordResetRequestComponent implements OnInit {
    form!: UntypedFormGroup;
    loading!: boolean;
    private email!: string;
    private authService = inject(AuthenticationService);
    private notificationService = inject(NotificationService);
    private titleService = inject(Title);
    private router = inject(Router);

    ngOnInit() {
        this.titleService.setTitle('angular-material-template - Password Reset Request');

        this.form = new UntypedFormGroup({
            email: new UntypedFormControl('', [Validators.required, Validators.email])
        });

        this.form.get('email')?.valueChanges
            .subscribe((val: string) => {
                this.email = val.toLowerCase();
            });
    }

    resetPassword() {
        this.loading = true;
        this.authService.passwordResetRequest(this.email)
            .subscribe(
                results => {
                    this.router.navigate(['/auth/login']);
                    this.notificationService.openSnackBar('Password verification mail has been sent to your email address.');
                },
                error => {
                    this.loading = false;
                    this.notificationService.openSnackBar(error.error);
                }
            );
    }

    cancel() {
        this.router.navigate(['/']);
    }
}
