import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  GoalForTwoUsers: a
    .model({
      goalId: a.integer(),
      goal: a.string(),
      reward1: a.string(),
      money1: a.integer(),
      reward2: a.string(),
      money2: a.integer(),
      goalDate: a.date(),
      createdAt: a.timestamp(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  // User: a
  //   .model({
  //     name: a.string(),
  //     email: a.string(),
  //   })
  //   .authorization((allow) => [allow.publicApiKey()]),

  // Document: a
  //   .model({
  //     goalId: a.string(),
  //     status1: a.string(),
  //     status2: a.string(),
  //   })
  //   .authorization((allow) => [allow.publicApiKey()]),

  // Goal: a
  //   .model({
  //     userId: a.string(),
  //     goalDate: a.date(),
  //     reward: a.string(),
  //     amount: a.integer(),
  //     description: a.string(),
  //     createdAt: a.timestamp(),
  //   })
  //   .authorization((allow) => [allow.publicApiKey()]),

  // Document: a
  //   .model({
  //     userId: a.string(),
  //     goalId: a.string(),
  //     documentUrl: a.string(),
  //     status: a.string(),
  //     createdAt: a.timestamp(),
  //   })
  //   .authorization((allow) => [allow.publicApiKey()]),

  // Result: a
  //   .model({
  //     userId: a.string(),
  //     goalId: a.string(),
  //     resultStatus: a.string(),
  //     feedback: a.string(),
  //     notifiedAt: a.timestamp(),
  //   })
  //   .authorization((allow) => [allow.publicApiKey()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
