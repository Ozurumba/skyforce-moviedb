import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CanActivate } from '@angular/router';
import { UserProvider } from '../providers/features/users';
import { GlobalsProvider } from '../providers/core/globals';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;

  constructor(
    private router: Router, 
    private globals: GlobalsProvider,
    private uData: UserProvider
  ) {
  }

 canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve, reject) => {
      this.uData.isLoggedOn()
      .then((res: boolean) => {
        if(!res) {
          this.globals.splitPaneToggle = false;
          this.globals.router.navigateByUrl(
            (!this.globals.platform.is('mobile')) 
              ? "login"
              : 'welcome'
          )
          reject(res);
        } 
        this.globals.splitPaneToggle = true;
        resolve(res);
      })
      .catch((err: boolean) => {
        this.globals.splitPaneToggle = false;
        this.globals.router.navigateByUrl(
          (!this.globals.platform.is('mobile')) 
            ? "login"
            : 'welcome'
        )
        reject(err);
      });
    })
  }
  
}
