import {PostModel} from "./post.model";

export interface PostStateModel {
  posts: PostModel[];
  error: string|null;
  isLoading: boolean
}
