import {Component, Input, OnInit} from '@angular/core';
import {PageService} from "../../services/page.service";
import {environment} from '../../../environments/environment';
import {ActionService} from "../../services/action.service";
import {AuthorService} from "../../services/author.service";
import {Page} from "../../models/page";
import {Action} from "../../models/action";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';
import {Subject} from "rxjs/Subject";


@Component({
  selector: 'story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {

  public currentPage: Page;
  public decisions: Array<any>;
  private author: any; // TODO replace with actual author object

  private errorMessage;

  private newActionDescription; // used via ngModel for frontend
  private newPageContent; // used via ngModel for frontend

  // environment variables
  private pageActionLength: number;

  constructor(
    private pageService: PageService,
    private actionService: ActionService,
    private authorService: AuthorService
  ) {

    this.pageActionLength = environment.pageActionLength;
    this.decisions = [];
  }

  ngOnInit() {
    this.author = this.authorService.getAuthor();
    this.getPage(environment.firstPageId).subscribe((nextPage: Page) => {
        this.currentPage = nextPage;
      },
      error => this.handleError(error)
    );
  }

  public turnBack(page: Page) {
    console.log("turn back");
    let decisionIndex = 0;

    for (let i = 0; i < this.decisions.length; i++) {
      if(page.id == this.decisions[i]['page']['id']) {
        decisionIndex = i;
      }
    }

    console.log("d index: " + decisionIndex);
    this.decisions = this.decisions.slice(0, decisionIndex);
    this.currentPage = page;
  }

  public turnPage(page: Page, action: Action) {

    if ( !action || !action.nextPage ) {
      this.currentPage = null;
      this.decisions.push({
        'page': page,
        'action': action
      })
      return;
    }

    this.getPage(action.nextPage).subscribe((nextPage: Page) => {
        console.log("turnPage", page, action);
        this.currentPage = nextPage;
        this.decisions.push({
          'page': page,
          'action': action
        })
      },
      error => {console.log('error'); this.handleError(error)}
    );
  }

  private getPage(pageId: number): Observable<any> {
    return this.pageService.getPage(pageId).map(page => page);
  }

  public savePage(): void {
    let previousActionId = this.decisions[0].action.id;
    console.log("Save currentPage", this.newPageContent, previousActionId, this.author.id);

    this.pageService
      .createPage(this.newPageContent, previousActionId, this.author.id)
      .subscribe((page: Page) => {
          console.log("Saved page:", page);

          this.newPageContent = null;
          this.currentPage = page;
          console.log("decisions", this.decisions);
        },
        error => this.handleError(error)
      );
  }

  public saveAction(): void {
    console.log("Save action", this.newActionDescription);

    this.actionService
      .createAction(this.newActionDescription, this.currentPage.id, this.author.id)
      .subscribe((action: Action) => {
          console.log("Page component", action);
          this.newActionDescription = null;
          this.currentPage.actions.push(action);
        },
        error => this.handleError(error)
      );
  }

  private handleError(error) {
    console.error("Error getting page", error.json());
    let errorResponse = error.json();

    if (errorResponse && errorResponse.message) {
      this.errorMessage = errorResponse.message;
    } else {
      this.errorMessage = "Sorry, it looks like something went terribly, horribly... wrong?"
    }
  }

}
