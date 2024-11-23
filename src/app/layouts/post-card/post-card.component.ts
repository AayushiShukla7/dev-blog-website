import { DatePipe, JsonPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [
    DatePipe
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

    if(this.postData != undefined) {
      var dataString = JSON.stringify(this.postData);
      var parsedData = JSON.parse(dataString);

      var test = JSON.stringify(parsedData.data);
      var data1 = JSON.parse(test); //JSON.parse('{"postImagePath":"http://res.cloudinary.com/de3clglcb/image/upload/v1732064774/Purpose.jpg.jpg"}');

      console.log(data1);
      //console.log(data1["postImagePath"]);

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
