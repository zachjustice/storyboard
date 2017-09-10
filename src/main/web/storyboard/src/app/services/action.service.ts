import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {Http} from "@angular/http";
import {Action} from "../models/action";

@Injectable()
export class ActionService {

  private url = environment.apiBaseUrl + '/actions'

  constructor(private http: Http) { }

  createAction(description: string, prevPage: number, author_id: number) {
    if(!description || !prevPage || !author_id) {
      console.error("Create action incorrect params.");
      return;
    }

    let params = {
      "description": description,
      "prevPage": prevPage,
      "author_id": author_id
    };

    return this.http.post(this.url, params).map((response) => {
      return response.json() as Action;
    });

  }
}
