import { Component, OnInit } from '@angular/core';
import {AuthorService} from "../../services/author.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username: string;
  public password: string;

  constructor(private authorService: AuthorService) { }

  ngOnInit() {
  }

  public login() {
    console.log("LOGGING IN: ", this.username, this.password);
    this.authorService.checkinAuthor(this.username, this.password).subscribe();
  }

}
