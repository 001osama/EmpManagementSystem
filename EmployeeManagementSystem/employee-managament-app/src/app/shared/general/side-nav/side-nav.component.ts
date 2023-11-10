import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MENU } from 'src/constants/lib';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  public sidebarMenu: any[] = MENU;
  public routeName: string = '';

  constructor(
    private readonly _router: Router
  ) { }

  ngOnInit(): void {
    this.routeName = this._router.url;
  }

  active(route: string){
    this.routeName = this._router.url;
    return this.routeName.includes(route);
  }

}
