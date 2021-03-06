import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { Router } from'@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  navbarOpen = false;

  constructor(
    private authService:AuthService,
    private router:Router,
    private flashMessage:FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onLOgoutClick(){
    this.authService.logout();
    this.flashMessage.show('You are logged out',{cssClass:'alert-success',timeout:3000});
    this.router.navigate(['/login']);
    return false;
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
}
