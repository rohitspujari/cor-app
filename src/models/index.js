// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Post, Feedback } = initSchema(schema);

export {
  Post,
  Feedback
};