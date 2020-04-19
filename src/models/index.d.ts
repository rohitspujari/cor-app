import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Post {
  readonly id: string;
  readonly service?: string;
  readonly feature?: string;
  readonly problem?: string;
  readonly solution?: string;
  readonly resources?: string;
  readonly user?: string;
  readonly searchField?: string;
  constructor(init: ModelInit<Post>);
  static copyOf(source: Post, mutator: (draft: MutableModel<Post>) => MutableModel<Post> | void): Post;
}

export declare class Feedback {
  readonly id: string;
  readonly contact?: string;
  readonly comment?: string;
  readonly createdAt?: string;
  constructor(init: ModelInit<Feedback>);
  static copyOf(source: Feedback, mutator: (draft: MutableModel<Feedback>) => MutableModel<Feedback> | void): Feedback;
}