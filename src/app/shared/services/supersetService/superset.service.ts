import { Injectable } from '@angular/core';
import { BackendService } from 'src/app/shared/services/backend-service/backend.service';
import { Observable } from 'rxjs';
import {Superset} from '../backend-models';
import { UserAuthenticationService } from '../../users-lib/user-authentication-service/user-authentication.service';


@Injectable({
  providedIn: 'root'
})
export class SupersetService {

  private readonly url = `http://localhost:3000/supersets`

  constructor(private backendService: BackendService, private userAuthService: UserAuthenticationService) {}

  public getSupersets$(): Observable<Superset[]> {
    const user = this.userAuthService.getLoggedInUser();
    return this.backendService.httpRequest(this.url + "?username=" + user.username + "&session_token=" + user.sessionToken);
  }
}
