import {inject, Injectable} from '@angular/core';
import {delay, Observable, of} from "rxjs";
import {PostModel} from "../models/post.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  http = inject(HttpClient)
  api: string = 'https://jsonplaceholder.typicode.com/posts';

  getAllPosts(): Observable<PostModel[]> {
    return this.http.get<PostModel[]>(this.api).pipe(delay(300))
    // const posts = [
    //   {id: '1', title: 'First post'},
    //   {id: '2', title: 'Second post'},
    //   {id: '3', title: 'Third post'},
    //   {id: '5', title: 'Fourth post'},
    // ];
    // return of(posts).pipe(delay(3000))
  }
}
