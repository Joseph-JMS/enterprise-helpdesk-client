export interface CommentResponse {
  id: number;
  content: string;
  author: string;
  createdAt: string;
}

export interface CommentRequest {
  content: string;
}