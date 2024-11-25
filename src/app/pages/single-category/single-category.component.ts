import { Component, OnInit } from '@angular/core';
import { PostCardComponent } from "../../layouts/post-card/post-card.component";
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-single-category',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PostCardComponent
  ],
  templateUrl: './single-category.component.html',
  styleUrl: './single-category.component.css'
})
export class SingleCategoryComponent implements OnInit {

  postsArray !: Array<any>;

  constructor(private route: ActivatedRoute, private postsService: PostsService) {}

  ngOnInit(): void {
    this.route.params.subscribe(val => {
      this.loadCategoryPost(val);
    });
  }
  
  loadCategoryPost(catId: any) {
    var dataString = JSON.stringify(catId);
    var parsedData = JSON.parse(dataString);
    var id = parsedData["id"];

    this.postsService.loadCategoryPosts(id)
    .then(res => {
      //console.log(res);
      this.postsArray = res;
    });
  }

}
