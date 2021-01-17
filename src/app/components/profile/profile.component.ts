import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user:any;

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit() {
    //this.getUser();
    
   this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
    },
     err => {
       console.log(err);
       return false;
     });
    
  }
  /*getUser(){
    this.user = localStorage.getItem('user');
    console.log(this.user);
    return this.user
  }*/
}