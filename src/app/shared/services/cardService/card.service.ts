import { Injectable } from '@angular/core';
import { BackendService } from 'src/app/shared/services/backend-service/backend.service';
import { Observable } from 'rxjs';
import {Card, KanjiCard} from '../backend-models';
import { UserAuthenticationService } from '../../users-lib/user-authentication-service/user-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private readonly urlCards = `http://localhost:3000/base_cards/cards`;
  private readonly urlKanjiCards = `http://localhost:3000/base_cards/kanji_cards`;

  constructor(private backendService: BackendService, private userAuthService: UserAuthenticationService) {}

  public getCards$(setId: number): Observable<Card[]> {
    const user = this.userAuthService.getLoggedInUser();
    return this.backendService.httpRequest(`${this.urlCards}/?setId=${setId}&username=${user.username}&session_token=${user.sessionToken}`);
  }

  public getKanjiCards$(setId: number): Observable<KanjiCard[]> {
    const user = this.userAuthService.getLoggedInUser();
    return this.backendService.httpRequest(`${this.urlKanjiCards}/?setId=${setId}&username=${user.username}&session_token=${user.sessionToken}`);
  }
}

