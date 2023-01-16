export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
export interface Action {
  id: number;
  post: Post;
  oldIndex: number;
  newIndex: number;
}
