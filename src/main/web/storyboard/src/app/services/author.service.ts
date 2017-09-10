import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {Author} from "../models/author";
import {Observable} from "rxjs/Observable";
import {environment} from "../../environments/environment";

@Injectable()
export class AuthorService {

  private currentAuthor: Author;

  constructor(private http: Http) {
    let storedAuthor = sessionStorage.author;

    if(!storedAuthor)
    {
      this.currentAuthor = null;
    }
    else
    {
      let author: Author = JSON.parse(sessionStorage.author) as Author;
      this.currentAuthor = author;
    }
  }

  public getAuthor(): any {
    return {
      "id": 14 // TODO replace with actual author
    }
  }

  checkinAuthor(username: string, password: string) {
    if(this.currentAuthor && this.currentAuthor.name == username) {
      return Observable.of(this.currentAuthor);
    }

    let params = {
      "email": username,
      "password": password
    };

    console.log("PARAMS", params);

    return this.http
      .post(`${environment.apiBaseUrl}/login`, params)
      .map((response) => {
        console.log(response);
        return response;
      });

  }
}
