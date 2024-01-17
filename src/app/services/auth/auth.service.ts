import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';
import {
  MsalService,
  MsalBroadcastService,
  MSAL_GUARD_CONFIG,
  MsalGuardConfiguration,
} from '@azure/msal-angular';
import {
  EventMessage,
  EventType,
  InteractionStatus,
  RedirectRequest,
  SilentRequest,
  AuthenticationResult,
} from '@azure/msal-browser';
import { BehaviorSubject, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { createClaimsTable } from 'src/app/utils/auth/claim-utils';

@Injectable()
export class authService {
  private readonly _destroying$ = new Subject<void>();
  loginDisplay = false;
  dataSource: any = [];
  scopes = ['https://digihubB2C.onmicrosoft.com/api/referential.read'];
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private broadcastService: MsalBroadcastService,
    private msalAuthService: MsalService
  ) {}

  // Ensure that the msalSubject$ event writes the authentication result to the browser console
  msalProgress$Event() {
    this.broadcastService.inProgress$
      .pipe(
        filter(
          (status: InteractionStatus) => status === InteractionStatus.None
        ),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.checkAndSetActiveAccount();
        this.getClaims(
          this.msalAuthService.instance.getActiveAccount()?.idTokenClaims
        );
        this.loggedIn.next(true);
        this.setLoginDisplay();
      });
  }

  // Ensure that the inProgress$ event checks if a user is authenticated.
  msalSubject$Event() {
    this.broadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS)
      )
      .subscribe((res: EventMessage) => {
        console.log(res);
      });
  }

  retrieveAccessToken() {
    const silentRequest: SilentRequest = {
      scopes: this.scopes,
    };

    this.msalAuthService.instance.acquireTokenSilent(silentRequest).then(
      (result: AuthenticationResult) => {
        const accessToken = result.accessToken;
        console.log(`The access token is ${accessToken}`);
      },
      (error: any) => {
        console.log(`Failed to retieve access token: ${error}`);
      }
    );
  }

  // Check for logged in user
  get IsLoggedIn() {
    return this.loggedIn.asObservable();
  }

  // Set active account
  checkAndSetActiveAccount() {
    let activeAccount = this.msalAuthService.instance.getActiveAccount();

    if (
      !activeAccount &&
      this.msalAuthService.instance.getAllAccounts().length > 0
    ) {
      let accounts = this.msalAuthService.instance.getAllAccounts();
      this.msalAuthService.instance.setActiveAccount(accounts[0]);
    }
    this.retrieveAccessToken();
  }

  getClaims(claims: any) {
    if (claims) {
      const claimsTable = createClaimsTable(claims);
      this.dataSource = [...claimsTable];
      console.log(this.dataSource[8].value);
    }
  }

  login() {
    if (this.msalGuardConfig.authRequest) {
      this.msalAuthService.loginRedirect({
        ...this.msalGuardConfig.authRequest,
      } as RedirectRequest);
    } else {
      this.msalAuthService.loginRedirect();
    }
  }

  logout() {
    this.loggedIn.next(false);
    this.msalAuthService.logoutRedirect({
      postLogoutRedirectUri: '/',
    });
  }

  setLoginDisplay() {
    this.loginDisplay =
      this.msalAuthService.instance.getAllAccounts().length > 0;
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
