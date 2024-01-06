import {
  toTypedRxJsonSchema,
  ExtractDocumentTypeFromTypedRxJsonSchema,
  RxJsonSchema,
  RxDocument,
  RxCollection
} from 'rxdb';

const itemSchemaLiteral = {
  type: 'object',
  title: 'Item schema Schema',
  version: 1,
  description: 'describes a items related to a checklist',
  primaryKey: 'id',
  properties: {
    title: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    status: {
      type: 'string',
    },
    descriptionStatus: {
      type: 'string',
    },
    checklist_id: {
      type: 'string',
    }
  },
  required: ['title', 'status'],
} as const;

// Define the schema for the checklist
export const checklistSchemaLiteral = {
  title: 'Checklist Schema',
  version: 1,
  description: 'describes a checklist related to a marker',
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      maxLength: 100,
    },
    name: {
      type: 'string'
    },
    marker_id: {
      type: 'string',
    },
    items: {
      type: 'array',
      items: itemSchemaLiteral,
    },
  },
  required: ['marker_id', 'name'],
} as const;

const checklistSchemaTyped = toTypedRxJsonSchema(checklistSchemaLiteral);

export type ChecklistDocType = ExtractDocumentTypeFromTypedRxJsonSchema<typeof checklistSchemaTyped>;

export const checklistSchema: RxJsonSchema<ChecklistDocType> = checklistSchemaLiteral;

type ChecklistDocuments = RxDocument<ChecklistDocType, {}>;

export type ChecklistCollection = RxCollection<ChecklistDocType, {}, ChecklistDocuments>;
