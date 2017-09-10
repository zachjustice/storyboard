import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";

import {TrimPipe} from "./shared/trim-pipe";

import {ActionService} from "./services/action.service";
import {AuthorService} from "./services/author.service";

import { AppComponent } from './app.component';
import { StoryComponent } from './components/story/story.component';
import { PageService } from "./services/page.service";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AutoGrowDirective } from './directives/auto-grow.directive';
import { ContentEditableModelDirective } from './directives/content-editable-model.directive';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';


// test

@NgModule({
  declarations: [
    AppComponent,
    StoryComponent,
    TrimPipe,
    AutoGrowDirective,
    ContentEditableModelDirective,
    PageNotFoundComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    FormsModule,
    NgbModule.forRoot()
  ],
  providers: [
    PageService,
    AuthorService,
    ActionService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
