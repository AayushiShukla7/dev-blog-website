import { Component, OnInit } from '@angular/core';
import { PostCardComponent } from '../../layouts/post-card/post-card.component';
import { CommentFormComponent } from '../../comments/comment-form/comment-form.component';
import { CommentListComponent } from '../../comments/comment-list/comment-list.component';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-single-post',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PostCardComponent,
    CommentFormComponent,
    CommentListComponent,
    DatePipe
  ],
  templateUrl: './single-post.component.html',
  styleUrl: './single-post.component.css'
})
export class SinglePostComponent implements OnInit {

  postData: any;
  similarPosts: Array<any> = [{}];
  categoryId: any;
  postId: any;

  constructor(private route: ActivatedRoute, private postsService: PostsService) {}

  ngOnInit(): void {
    this.route.params.subscribe(val => {
      //console.log(val['id']);
      this.postsService.countViews(val['id']);  // Increment Views Count

      this.postId = val;
      this.loadOnePost(val);      
    });
    
  }

  loadOnePost(id: any) {
    this.postsService.loadSinglePostData(id)
    .subscribe((res: any) => {
      //console.log(res);
      this.postData = res;
      
      this.categoryId = this.postData.category.categoryId;
      this.loadSimilarPosts(this.categoryId, this.postId);
    });
  }

  loadSimilarPosts(catId: any, postId: any) {
    this.postsService.loadSimilar(catId, postId)
    .then((res: any) => {
      //console.log(res);
      this.similarPosts = res;
    });
  }

}
