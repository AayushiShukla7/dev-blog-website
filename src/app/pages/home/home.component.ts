import { Component, OnInit } from '@angular/core';
import { PostCardComponent } from '../../layouts/post-card/post-card.component';
import { PostsService } from '../../services/posts.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    PostCardComponent,
    CommonModule,
    FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  featuredPostsArray: Array<any> = [];

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.postsService.loadFeatured()
    .then(res => {
      //console.log(res);
      this.featuredPostsArray = res;
    });
  }

}
