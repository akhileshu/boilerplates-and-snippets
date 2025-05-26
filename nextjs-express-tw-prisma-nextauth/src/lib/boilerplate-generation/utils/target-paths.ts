import { CRUDOperation } from "../types";
import { toJoinedKebabCase, toPascalCase } from "./helpers";

const featureBasePath = "src/features";
const f = (path: string) => `${featureBasePath}${path}`;

type FeaturePathParams = {
  feature: string;
  name: string;
};

type ComponentPathParams = {
  featureName: string;
  componentName: string;
};

type ServerActionType = "custom" | "crud";

export const targetPaths = {
  /** ex: prismaModel("user") → prisma/models/user.prisma */
  prismaModel: (schemaName: string) => `prisma/models/${schemaName}.prisma`,

  /** ex: schema("video", "videoInput") → src/features/video/schemas/videoInputSchema.ts */
  schema: ({ feature, name }: FeaturePathParams) =>
    f(`/${feature}/schemas/${name}Schema.ts`),

  /** ex: hook("video", "uploadVideo") → src/features/video/hooks/useUploadVideo.ts */
  hook: ({ feature, name }: FeaturePathParams) =>
    f(`/${feature}/hooks/use${toPascalCase(name)}.ts`),

  /** ex: type("video", "video") → src/features/video/types/videoTypes.ts */
  type: ({ feature, name }: FeaturePathParams) =>
    f(`/${feature}/types/${name}Types.ts`),

  /** ex: util("video", "formatDuration") → src/features/video/utils/formatDuration.ts */
  util: ({ feature, name }: FeaturePathParams) =>
    f(`/${feature}/utils/${name}.ts`),

  /** ex: constant("video", "videoStatus") → src/features/video/constants/videoStatus.ts */
  constant: ({ feature, name }: FeaturePathParams) =>
    f(`/${feature}/constants/${name}.ts`),

  routes: {
    /** ex: src/app/(with-layout)/video/upload/page.tsx */
    page: (page: string) => `src/app/(with-layout)/${page}/page.tsx`,
  },

  components: {
    /** ex: renderServer({...}, false) → .../user-renderer.tsx | true → .../user-list-renderer.tsx */
    renderServer: (
      { featureName, componentName }: ComponentPathParams,
      renderAsList: boolean
    ) =>
      f(
        `/${featureName}/components/${componentName}/${toJoinedKebabCase(
          componentName,
          renderAsList ? "list-renderer" : "renderer"
        )}.tsx`
      ),

    /** ex: renderClient({...}, false) → .../User-Detail-Card.tsx | true → .../User-List-View.tsx */
    renderClient: (
      { featureName, componentName }: ComponentPathParams,
      renderAsList: boolean
    ) =>
      f(
        `/${featureName}/components/${componentName}/${toJoinedKebabCase(
          componentName,
          renderAsList ? "List-View" : "Detail-Card"
        )}.tsx`
      ),

    /** ex: form({...}, "edit") → .../edit-user-form.tsx */
    form: (
      { featureName, componentName }: ComponentPathParams,
      formType: string
    ) =>
      f(
        `/${featureName}/components/${componentName}/${toJoinedKebabCase(
          formType,
          componentName,
          "form"
        )}.tsx`
      ),

    /** ex: ui({...}, "table") → .../user-table.tsx */
    ui: ({ featureName, componentName }: ComponentPathParams, uiType: string) =>
      f(
        `/${featureName}/components/${componentName}/${toJoinedKebabCase(
          componentName,
          uiType
        )}.tsx`
      ),
  },

  serverActions: {
    /** ex: serverAction("video", "crud") → .../video-crud-actions.tsx | "custom", "read" → .../video-read-action.tsx */
    serverAction: (
      featureName: string,
      type: ServerActionType,
      operation?: CRUDOperation
    ) =>
      f(
        `/${featureName}/actions/${toJoinedKebabCase(
          featureName,
          type === "custom" ? `${operation}-action` : "crud-actions"
        )}.tsx`
      ),

    /** ex: serverActionsIndex("video") → .../actions/index.ts */
    serverActionsIndex: (featureName: string) =>
      f(`/${featureName}/actions/index.ts`),
  },

  /** ⚠️ untested , ex: componentTest("video", "upload") → .../upload.test.tsx */
  componentTest: ({ feature, name }: FeaturePathParams) =>
    f(`/${feature}/components/${name}/${name}.test.tsx`),
};






/*
  component: (feature: string, name: string) =>
    f(`/${feature}/components/${name}/${name}.tsx`,

  uiTable: (feature: string, name: string) =>
    f(`/${feature}/components/${name}/${toPascalCase(
      name
    )}Table.tsx`,

  uiModal: (feature: string, name: string) =>
    f(`/${feature}/components/${name}/${toPascalCase(
      name
    )}Modal.tsx`,

  formCreate: (feature: string, name: string) =>
    f(`/${feature}/components/${name}/Create${toPascalCase(
      name
    )}Form.tsx`,

  formEdit: (feature: string, name: string) =>
    f(`/${feature}/components/${name}/Edit${toPascalCase(
      name
    )}Form.tsx`,

  formDelete: (feature: string, name: string) =>
    f(`/${feature}/components/${name}/Delete${toPascalCase(
      name
    )}Form.tsx`,

  store: (feature: string) => f(`/${feature}/store.ts`),

    */
