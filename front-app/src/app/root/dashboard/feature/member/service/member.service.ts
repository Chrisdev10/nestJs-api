import { Injectable, WritableSignal, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  list$: WritableSignal<string[]> = signal(['test user', 'test user2']);
  detail$: WritableSignal<string> = signal('');
  constructor() {}
}
