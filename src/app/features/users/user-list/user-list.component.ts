import {Component, inject, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {NGXLogger} from 'ngx-logger';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class UserListComponent implements OnInit {
    private logger = inject(NGXLogger);
    private titleService = inject(Title);

    ngOnInit() {
        this.titleService.setTitle('angular-material-template - Users');
        this.logger.log('Users loaded');
    }
}
