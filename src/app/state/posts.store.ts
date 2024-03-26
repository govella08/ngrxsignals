import {patchState, signalStore, withComputed, withHooks, withMethods, withState} from "@ngrx/signals";
import {PostStateModel} from "../models/post.state.model";
import {computed, inject} from "@angular/core";
import {PostModel} from "../models/post.model";
import {PostService} from "../services/post.service";
import {pipe, switchMap, tap} from "rxjs";
import {rxMethod} from "@ngrx/signals/rxjs-interop";

export const PostsStore = signalStore(
  withState<PostStateModel>({
    posts: [],
    error: null,
    isLoading: false
  }),
  withComputed(store => ({
    postCount: computed(() => store.posts().length)
  })),
  withMethods((store, postService = inject(PostService)) => ({
    addPost(title: string) {
      const newPost: PostModel = {
        id: crypto.randomUUID(),
        title
      };
      const updatedPost = [...store.posts(), newPost];
      // postService.getAllPosts()
      patchState(store, {posts: updatedPost})
    },
    removePost(id: string) {
      const updatedPost = store.posts().filter((post) => post.id != id)
      patchState(store, {posts: updatedPost})
    },
    addPosts(posts: PostModel[]) {
      patchState(store, {isLoading: true})
      if (posts) {
        patchState(store, {posts, isLoading: false})
      }
    },
    loadingState(loadingState: boolean) {
      patchState(store, {isLoading: loadingState})
    },
    loadPosts: rxMethod<void>(
      pipe(
        switchMap(() => {
          patchState(store, {isLoading: true})
          return postService.getAllPosts().pipe(
            tap((posts) => {
            patchState(store, {posts, isLoading: false})
          }))
        })
      )
    )
  })),
  withHooks((store) => ({
    onInit() {
      store.loadPosts()
    }
  })),
)
