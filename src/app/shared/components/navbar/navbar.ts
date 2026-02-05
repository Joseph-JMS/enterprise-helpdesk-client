import { Component } from '@angular/core';
import { RouterLinkActive, RouterLinkWithHref } from "@angular/router";

@Component({
  selector: 'app-navbar',
  imports: [RouterLinkActive, RouterLinkWithHref],
  templateUrl: './navbar.html',
})
export class Navbar { }
