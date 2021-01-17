import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  name!: string;
  username!: string;
  email!: string;
  password!: string;
  public error!:string;

  constructor(private authService:AuthService,private router:Router,private _snackBar:MatSnackBar ) { }

  ngOnInit(): void {
  }

  is_valid_form(): boolean {
    if(!this.name || this.name.replace(/\s/g, "").length < 4) {
      this.error = 'Please enter a valid username.';
      return false;
    } 
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

  Register() {

    if(!this.is_valid_form()) {
      return;
    }

    const user:any = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }
    this.authService.registerUser(user).subscribe(data => {
    if(data.success) {
      this.router.navigate(['/login']);
      this.openSnackBar("Registerd Successfully.Please Login")
    } else {
      this.router.navigate(['/register']);
      this.openSnackBar('Some field missing');
    }
  });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'close', {
      duration: 2000,
    });
 }

}