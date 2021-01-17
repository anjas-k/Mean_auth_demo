import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NONE_TYPE } from '@angular/compiler';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy {
  username!: string;
  password!: string;
  public error!: string;


  constructor(private auth: AuthService,private router:Router,private _snackBar:MatSnackBar) {}

  ngOnInit() {
  }
  ngOnDestroy() {
  }

  is_valid_form(): boolean {
    if(!this.username || this.username.replace(/\s/g, "").length < 4) {
      this.error = 'Please enter a valid username.';
      return false;
    } 
    if(!this.password || this.password.replace(/\s/g, "").length < 6) {
      this.error = 'Please enter a valid password(Length should be greatet than 6).';
      return false;
    } 
    return true;
  }

  login() {
    if(!this.is_valid_form()) {
      return;
    }
    const user:any= {
      username: this.username,
      password: this.password
    }

    this.auth.authenticateUser(user).subscribe(data => {
        if(data.success) {
          this.auth.storeUserData(data.token, data.user);
          this.router.navigate(['home']);
          this.openSnackBar('Loggined Successfully')
        } else {
          this.router.navigate(['login']);
          this.openSnackBar('Username or Password is Invalid')
        }
    });

}
 openSnackBar(message: string) {
    this._snackBar.open(message, 'close', {
      duration: 2000,
    });
 }

}