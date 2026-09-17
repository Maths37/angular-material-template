import {Component, inject, OnInit} from '@angular/core';
import {NotificationService} from 'src/app/core/services/notification.service';
import {Title} from '@angular/platform-browser';
import {NGXLogger} from 'ngx-logger';
import {AuthenticationService} from 'src/app/core/services/auth.service';

@Component({
    selector: 'app-dashboard-home',
    templateUrl: './dashboard-home.component.html',
    styleUrls: ['./dashboard-home.component.css'],
    standalone: false
})
export class DashboardHomeComponent implements OnInit {
    currentUser: any;
    private notificationService = inject(NotificationService);
    private authService = inject(AuthenticationService);
    private titleService = inject(Title);
    private logger = inject(NGXLogger);

    ngOnInit() {
        this.currentUser = this.authService.getCurrentUser();
        this.titleService.setTitle('angular-material-template - Dashboard');
        this.logger.log('Dashboard loaded');

        setTimeout(() => {
            this.notificationService.openSnackBar('Welcome!');
        });
    }
}
