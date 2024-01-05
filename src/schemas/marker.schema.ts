import {
  toTypedRxJsonSchema,
  ExtractDocumentTypeFromTypedRxJsonSchema,
  RxJsonSchema,
  RxDocument,
  RxCollection
} from 'rxdb';

export const markerSchemaLiteral = {
  title: "Marker Schema",
  version: 0,
  description: "describes a marker where user clicked",
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      type: "string",
      maxLength: 100,
    },
    status: {
      type: "string",
    },
    createdBy: {
      type: "number",
      minimum: 0,
      maximum: 100,
    },
  },
} as const; 
const schemaTyped = toTypedRxJsonSchema(markerSchemaLiteral);

export type MarkerDocType = ExtractDocumentTypeFromTypedRxJsonSchema<typeof schemaTyped>;

export const markerSchema: RxJsonSchema<MarkerDocType> = markerSchemaLiteral;

type MarkerDocuments = RxDocument<MarkerDocType, {}>;

export type MarkerCollection = RxCollection<MarkerDocType, {}, MarkerDocuments>;
