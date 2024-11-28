import { CommonModule, DatePipe, JsonPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [
    DatePipe,
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css'
})
export class PostCardComponent implements OnInit {

  @Input() postData: any;
  dynamicData: any;
  imagePath: any;
  title: any;
  category: any;
  excerpt: any;
  views: any;
  createdAt: any;

  constructor() {}

  ngOnInit(): void {
    //console.log(this.postData);
    var dataString = JSON.stringify(this.postData);

    if(dataString != null && dataString != '') {      
      var parsedData = JSON.parse(dataString);
      var test = JSON.stringify(parsedData.data);

      if(test != null && test != '') {
        var data1 = JSON.parse(test); 
        //console.log(data1);

        this.dynamicData = data1;      
        this.imagePath = data1["postImagePath"];
        this.category = data1["category"].category;
        this.title = data1["title"];
        this.views = data1["views"];
        this.excerpt = data1["excerpt"];
        this.createdAt = data1["createdAt"].seconds;   
      }   
    }
  }

}
