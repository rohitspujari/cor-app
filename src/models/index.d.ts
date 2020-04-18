import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Post {
  readonly id: string;
  readonly service?: string;
  readonly feature?: string;
  readonly problem: string;
  readonly solution?: string;
  readonly resources?: string;
  readonly views?: number;
  readonly likes?: number;
  readonly dislikes?: number;
  constructor(init: ModelInit<Post>);
  static copyOf(source: Post, mutator: (draft: MutableModel<Post>) => MutableModel<Post> | void): Post;
}