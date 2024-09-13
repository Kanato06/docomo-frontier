import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  GoalForTwoUsers: a
    .model({
      goal: a.string(),
      reward1: a.string(),
      money1: a.integer(),
      reward2: a.string(),
      money2: a.integer(),
      goalDate: a.date(),
    })
    .authorization((allow) => [allow.owner()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
  },
});
