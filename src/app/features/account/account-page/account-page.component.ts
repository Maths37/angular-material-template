import {Component, inject, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'app-account-page',
    templateUrl: './account-page.component.html',
    styleUrls: ['./account-page.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class AccountPageComponent implements OnInit {
    private titleService = inject(Title);

    ngOnInit() {
        this.titleService.setTitle('angular-material-template - Account');
    }
}
