import { ActionType } from "plop";
import { FeatureConfig } from "../../types";
import { targetPaths } from "../target-paths";
import { templatePaths } from "../template-paths";

export const GenerateActionsForFeaturePages = (
  feature: FeatureConfig,
  actions: ActionType[]
) => {
  const { pages } = feature;
  pages?.forEach((page) => {
    const pageName = page.replace(/[\/\(\)\[\]]/g, "");
    actions.push({
      type: "add",
      // path: `src/features/${feature.name}/pages${page}/page.tsx`,
      path: targetPaths.routes.page(page),
      templateFile: templatePaths.routes.page,
      data: {
        name: pageName,
        components: feature.components,
        hooks: feature.hooks,
        store: feature.store,
      },
    });
    actions.push({
      type: "add",
      path: `cypress/e2e/${feature.name}/${pageName}.cy.ts`,
      templateFile: templatePaths.e2e, // define this in your template config
      data: {
        featureName: feature.name,
        pageUrl: page,
        testName: pageName,
      },
    });
  });
};
