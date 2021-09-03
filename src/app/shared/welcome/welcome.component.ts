import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  user = this.userService.getCurrentUser();

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

}
