import {
  toTypedRxJsonSchema,
  ExtractDocumentTypeFromTypedRxJsonSchema,
  RxJsonSchema,
  RxDocument,
  RxCollection
} from 'rxdb';

export const userSchemaLiteral = {
  title: "User Schema",
  version: 0,
  description: "describes a user where user clicked",
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      type: "string",
      maxLength: 100,
    },
    username: {
      type: "string",
      maxLength: 255,
    }
  },
} as const; 
const schemaTyped = toTypedRxJsonSchema(userSchemaLiteral);

export type UserDocType = ExtractDocumentTypeFromTypedRxJsonSchema<typeof schemaTyped>;

export const userSchema: RxJsonSchema<UserDocType> = userSchemaLiteral;

type UserDocuments = RxDocument<UserDocType, {}>;

export type UserCollection = RxCollection<UserDocType, {}, UserDocuments>;
