import { Component, OnInit } from '@angular/core';
import { AuthServices } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private readonly _authService: AuthServices
  ) { }

  ngOnInit(): void {
  }

  logout(){
    this._authService.logout();
  }

}
