import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {environment} from "../../environments/environment";

import 'rxjs/add/operator/map';
import {Page} from "../models/page";

@Injectable()
export class PageService {

  constructor(private http: Http) { }

  public createPage(content: string, previousActionId: number, authorId: number) {
    let params = {
      "content": content,
      "previous_action_id": previousActionId,
      "author_id": authorId
    };

    return this.http
      .post(`${environment.apiBaseUrl}/pages`, params)
      .map((response) => {
        return response.json() as Page;
      });
  }

  public getPage(id: number) {
    return this.http
      .get(`${environment.apiBaseUrl}/pages/${id}`)
      .map((response) => {
        return response.json() as Page;
      });
  }

}
