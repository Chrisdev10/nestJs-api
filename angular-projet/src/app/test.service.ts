import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class TestService {
  constructor(private readonly client: HttpClient) {}
  firstTest(login: string, pwd: string) {
    this.client
      .get<Object>(`http://localhost:3000/account?login=${login}&pwd=${pwd}`)
      .subscribe(x => console.log(JSON.stringify(x)));
  }
}
