import {
  EffectRef,
  Injectable,
  WritableSignal,
  effect,
  signal,
} from '@angular/core';
import { Token } from '@Shared/api';
import { environment } from '@env';
import { isNil } from 'lodash';
@Injectable({
  providedIn: 'root',
})
export class TokenService {
  token$: WritableSignal<Token> = signal(this.getToken());
  private readonly tokenSaveHandler: EffectRef = effect(() =>
    this.handleTokenChange(this.token$())
  );
  public setToken(token: Token): void {
    if (token.token.trim().length > 0) {
      // setter will trigger effect signal
      this.token$.set(token);
    } else {
      this.token$.set(this.getEmpty());
    }
  }
  private handleTokenChange(token: Token): void {
    // once the effect is triggered, we will reflect the changes into localstorage
    if (!token.isEmpty) {
      localStorage.setItem(environment.TOKEN_KEY, JSON.stringify(token));
    } else {
      localStorage.removeItem(environment.TOKEN_KEY);
    }
  }
  private getToken(): Token {
    const str = localStorage.getItem(environment.TOKEN_KEY);
    // if not token stored, we return empty Token to init signal
    return !isNil(str) ? (JSON.parse(str) as Token) : this.getEmpty();
  }
  private getEmpty(): Token {
    return { token: '', refreshToken: '', isEmpty: true };
  }
}
