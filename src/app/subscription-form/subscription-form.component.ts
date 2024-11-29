import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Sub } from '../models/sub';
import { SubscribersService } from '../services/subscribers.service';

@Component({
  selector: 'app-subscription-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './subscription-form.component.html',
  styleUrl: './subscription-form.component.css'
})
export class SubscriptionFormComponent implements OnInit {

  constructor(private subscribersService: SubscribersService) {}

  ngOnInit(): void {
    
  }

  onSubmit(subFormVal: any) {
    //console.log(subFormVal);
    const subData: Sub = {
      name: subFormVal.name,
      email: subFormVal.email
    }

    // Prevent Email duplication
    this.subscribersService.checkSubs(subFormVal.email).then(val => {
      //console.log(val);
      if(val == undefined) {
        this.subscribersService.addSubs(subData);
      }
      else {
        console.log('Email Address is Already in use');
      }
    });
  }

}
