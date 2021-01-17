import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private authService:AuthService,private router:Router,private _snackBar:MatSnackBar) { }

  ngOnInit(): void {
  }
  onLogoutClick() {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.openSnackBar('You are Logged Out')
    return false;
  }
  openSnackBar(message: string) {
    this._snackBar.open(message, 'close', {
      duration: 2000,
    });
 }
}
