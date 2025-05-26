/*
export interface FeatureConfig {
  name: string;
  components: string[];
  apiRoutes?: string[];
  serverActions: string[];
  dbModel: string[];
  zodSchemas: string[];
  hooks: string[];
  types: string[];
  store: string;
  utils: string[];
  constants: string[];
  messages: string[];
  pages: string[];
}
*/

import { Answers } from "inquirer";

export type RenderingComponentConfig = {
  name: string;
  option?: {
    generateTestFile?: boolean;
    isEditableView?: boolean;
    renderAsList?: boolean; // true = render list (of detail cards), false/undefined = render detail card
  };
};
export type ComponentConfig = {
  name: string;
  option?: {
    generateTestFile?: boolean;
  };
};

export type FormType = "create" | "edit" | "delete";
export type UIType = "table" | "modal";
export const formTypes: FormType[] = ["create", "edit", "delete"];
export const uiTypes: UIType[] = ["table", "modal"];



type FeatureComponents = {
  rendering?: RenderingComponentConfig[];
  forms?: Partial<Record<FormType, ComponentConfig[]>>;
  ui?: Partial<Record<UIType, ComponentConfig[]>>;
};

export type CRUDOperation = "create" | "read" | "update" | "delete";
export interface FeatureConfig {
  name: string;
  // components?: string[];
  components?: FeatureComponents;
  apiRoutes?: string[];
  serverActions?: {
    generateCRUD?: boolean;
    custom: {
      operation: CRUDOperation;
      name: string;
    }[];
  };
  prismaSchemas?: string[];
  zodSchemas?: string[];
  hooks?: string[];
  types?: string[];
  utils?: string[];
  constants?: string[];

  store?: string;
  messages?: string[];
  pages?: string[];
  services?: string[];
  permissions?: string[];
  layouts?: string[];
  providers?: string[];
  tests?: {
    components?: string[];
    api?: string[];
    utils?: string[];
  };
  mockData?: string[];
  env?: string[];
  readme?: boolean;
}

export interface PlopData extends Answers {
  featureName: string;
  partsToGenerate?: string[];
}
