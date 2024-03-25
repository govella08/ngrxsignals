import {Component, inject, OnInit} from '@angular/core';
import {PostsStore} from "../../state/posts.store";
import {PostService} from "../../services/post.service";
import {HttpClientModule} from "@angular/common/http";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {PostModel} from "../../models/post.model";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatCardModule} from "@angular/material/card";

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule, MatProgressSpinnerModule, MatCardModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
  providers: [PostsStore, PostService]
})
export class PostComponent {
  postService = inject(PostService)
  store = inject(PostsStore)
  fb = inject(FormBuilder)
  postForm = this.fb.nonNullable.group({
    title: ''
  })
  addPost() {
    this.store.addPost(this.postForm.getRawValue().title);
    this.postForm.reset()
  }

  // ngOnInit() {
  //   this.store.loadingState(true)
  //   this.postService.getAllPosts().subscribe((posts: PostModel[]) => {
  //     this.store.addPosts(posts)
  //     this.store.loadingState(false)
  //   })
  // }
}
