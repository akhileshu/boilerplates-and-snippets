import { ActionType } from "plop";
import {
  ComponentConfig,
  FeatureConfig,
  FormType,
  formTypes,
  RenderingComponentConfig,
  UIType,
  uiTypes,
} from "../../types";
import { toPascalCase } from "../helpers";
import { templatePaths } from "../template-paths";
import { targetPaths } from "../target-paths";

export const GenerateActionsForFeatureComponents = (
  feature: FeatureConfig,
  actions: ActionType[]
) => {
  if (!feature.components) return;

  const { rendering, forms, ui } = feature.components;

  rendering?.forEach((ComponentConfig) =>
    addRendering(ComponentConfig, feature, actions)
  );
  formTypes.forEach((formType) =>
    forms?.[formType]?.forEach((ComponentConfig) =>
      addForm(ComponentConfig, formType, feature, actions)
    )
  );
  uiTypes.forEach((uiType) =>
    ui?.[uiType]?.forEach((comp) => addUI(comp, uiType, feature, actions))
  );
};

function addRendering(
  RenderingComponentConfig: RenderingComponentConfig,
  feature: FeatureConfig,
  actions: ActionType[]
) {
  const data = {
    name: RenderingComponentConfig.name,
    isEditableView: RenderingComponentConfig.option?.isEditableView ?? false,
    renderAsList: RenderingComponentConfig.option?.renderAsList ?? false,
  };

  actions.push(
    {
      type: "add",
      path: targetPaths.components.renderServer(
        {
          featureName: feature.name,
          componentName: RenderingComponentConfig.name,
        },
        data.renderAsList
      ),
      templateFile: templatePaths.components.renderServer,
      data,
    },
    {
      type: "add",
      path: targetPaths.components.renderClient(
        {
          featureName: feature.name,
          componentName: RenderingComponentConfig.name,
        },
        data.renderAsList
      ),
      templateFile: templatePaths.components.renderClient,
      data,
    }
  );

  if (RenderingComponentConfig.option?.generateTestFile) {
    actions.push({
      type: "add",
      path: `src/features/${feature.name}/components/${RenderingComponentConfig.name}/__tests__/${RenderingComponentConfig.name}.test.tsx`,
      templateFile: templatePaths.componentTest,
      data,
    });
  }
}

function addForm(
  formComponentConfig: ComponentConfig,
  formType: FormType,
  feature: FeatureConfig,
  actions: ActionType[]
) {
  const data = { name: formComponentConfig.name };

  actions.push({
    type: "add",
    path: targetPaths.components.form(
      { featureName: feature.name, componentName: formComponentConfig.name },
      formType
    ),
    templateFile: getTemplateFilePath(`form${toPascalCase(formType)}`),
    data,
  });

  if (formComponentConfig.option?.generateTestFile) {
    actions.push({
      type: "add",
      path: `src/features/${feature.name}/components/${formComponentConfig.name}/__tests__/${formType}.test.tsx`,
      templateFile: templatePaths.componentTest,
      data,
    });
  }
}

function addUI(
  UIComponentConfig: ComponentConfig,
  uiType: UIType,
  feature: FeatureConfig,
  actions: ActionType[]
) {
  const data = { name: UIComponentConfig.name };

  actions.push({
    type: "add",
    path: targetPaths.components.ui(
      { featureName: feature.name, componentName: UIComponentConfig.name },
      uiType
    ),
    templateFile: getTemplateFilePath(`ui${toPascalCase(uiType)}`),
    data,
  });

  if (UIComponentConfig.option?.generateTestFile) {
    actions.push({
      type: "add",
      path: `src/features/${feature.name}/components/${UIComponentConfig.name}/__tests__/${uiType}.test.tsx`,
      templateFile: templatePaths.componentTest,
      data,
    });
  }
}

function getTemplateFilePath(key: string) {
  const templateFilePath =
    templatePaths.components[key as keyof typeof templatePaths.components];
  if (!templateFilePath) {
    throw new Error(
      `Template file for key "${key}" not found in templatePaths.components`
    );
  }
  return templateFilePath;
}
