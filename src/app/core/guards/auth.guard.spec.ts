import {AuthGuard} from './auth.guard';
import {Injector} from "@angular/core";
import {Router} from "@angular/router";
import {AuthenticationService} from "../services/auth.service";
import {NotificationService} from "../services/notification.service";
import moment from "moment";
import SpyInstance = jest.SpyInstance;


describe('AuthGuard', () => {
    let guard: AuthGuard;
    const router = jest.mocked(Router.prototype);
    const authService = jest.mocked(AuthenticationService.prototype);
    const notificationService = jest.mocked(NotificationService.prototype);
    let routerSpy: SpyInstance;

    beforeEach(() => {
        router.navigate = jest.fn()
            .mockResolvedValueOnce(Promise.resolve(true));
        routerSpy = jest.spyOn(router, 'navigate');
        notificationService.openSnackBar = jest.fn();
        guard = Injector.create({
            providers: [
                {provide: AuthGuard},
                {provide: Router, useValue: router},
                {provide: AuthenticationService, useValue: authService},
                {provide: NotificationService, useValue: notificationService},
            ],
        }).get(AuthGuard);
    });

    it('create an instance', () => {
        expect(guard).toBeTruthy();
    });

    it('returns false if user is null', () => {
        authService.getCurrentUser = jest.fn().mockImplementation(() => null);

        const result = guard.canActivate();

        expect(result).toBe(false);
    });

    it('redirects to login if user is null', () => {
        authService.getCurrentUser = jest.fn().mockImplementation(() => null);

        guard.canActivate();

        expect(router.navigate).toHaveBeenCalledWith(['auth/login']);
    });

    it('does not display expired notification if user is null', () => {
        authService.getCurrentUser = jest.fn().mockImplementation(() => null);

        guard.canActivate();

        expect(notificationService.openSnackBar).toHaveBeenCalledTimes(0);
    });

    it('redirects to login if user session has expired', () => {
        const user = {expiration: moment().add(-1, 'seconds')};
        authService.getCurrentUser = jest.fn().mockImplementation(() => user);

        guard.canActivate();

        expect(routerSpy).toHaveBeenCalledTimes(1);
    });

    it('displays notification if user session has expired', () => {
        const user = {expiration: moment().add(-1, 'seconds')};
        authService.getCurrentUser = jest.fn().mockImplementation(() => user);

        guard.canActivate();

        expect(notificationService.openSnackBar)
            .toHaveBeenCalledWith('Your session has expired');
    });

    it('returns true if user session is valid', () => {
        const user = {expiration: moment().add(1, 'minutes')};
        authService.getCurrentUser = jest.fn().mockImplementation(() => user);

        const result = guard.canActivate();

        expect(result).toBe(true);
    });
});
