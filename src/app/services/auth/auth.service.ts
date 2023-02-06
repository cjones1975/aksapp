import { Injectable } from '@angular/core';
import { Component, OnInit, Inject } from '@angular/core';
import { MsalService, MsalBroadcastService, MSAL_GUARD_CONFIG, MsalGuardConfiguration } from '@azure/msal-angular';
import { EventMessage, EventType, InteractionStatus, RedirectRequest } from '@azure/msal-browser';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators'

@Injectable()
export class authService {
    private readonly _destroying$ = new Subject<void>();
    loginDisplay = false;

    constructor(
        @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
        private broadcastService: MsalBroadcastService,
        private msalAuthService: MsalService
    ) { }

    // Ensure that the msalSubject$ event writes the authentication result to the browser console
    msalProgress$Event() {
        this.broadcastService.inProgress$.pipe(
            filter((status: InteractionStatus) => status === InteractionStatus.None),
            takeUntil(this._destroying$)
        ).subscribe(() => {
            this.setLoginDisplay();
        })
    }


    // Ensure that the inProgress$ event checks if a user is authenticated.
    msalSubject$Event() {
        this.broadcastService.msalSubject$.pipe(
            filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
        ).subscribe((res: EventMessage) => {
            console.log(res);
        })
    }

    login() {
        if (this.msalGuardConfig.authRequest) {
            this.msalAuthService.loginRedirect({ ...this.msalGuardConfig.authRequest } as RedirectRequest)
        } else {
            this.msalAuthService.loginRedirect();
        }
    }

    logout() {
        this.msalAuthService.logoutRedirect({
            postLogoutRedirectUri: 'http://localhost:4200'
        })
    }

    setLoginDisplay() {
        this.loginDisplay = this.msalAuthService.instance.getAllAccounts().length > 0;
    }

    ngOnDestroy(): void {
        this._destroying$.next(undefined);
        this._destroying$.complete();
    }


}