const path = require("path");
const helpers = require("../../plop-helpers");

module.exports = {
  componentActions: (feature) => {
    if (!feature.components?.length) return [];
    return feature.components.map((component) => ({
      type: "add",
      path: `src/features/${feature.name}/components/${component}/${component}.tsx`,
      templateFile: "plop-templates/component.hbs",
      data: {
        name: component,
        hooks: feature.hooks,
        store: feature.store,
        types: feature.types,
      },
    }));
  },

  apiRouteActions: (feature) => {
    if (!feature.apiRoutes?.length) return [];
    return feature.apiRoutes.map((route) => ({
      type: "add",
      path: `src/features/${feature.name}/api/${route}/route.ts`,
      templateFile: "plop-templates/api-route.hbs",
      data: {
        name: route,
        zodSchemas: feature.zodSchemas,
        serverActions: feature.serverActions,
        types: feature.types,
      },
    }));
  },

  modelActions: (feature) => {
    if (!feature.dbModel?.length) return [];
    return feature.dbModel.map((model) => ({
      type: "add",
      path: `src/features/${feature.name}/models/${model}.ts`,
      templateFile: "plop-templates/model.hbs",
      data: {
        name: model,
        types: feature.types,
      },
    }));
  },

  // ... include all other action generators from previous examples ...

  generateAllActions: (feature) => {
    return [
      ...this.componentActions(feature),
      ...this.apiRouteActions(feature),
      ...this.modelActions(feature),
      ...this.hookActions(feature),
      ...this.storeActions(feature),
      ...this.schemaActions(feature),
      ...this.typeActions(feature),
      ...this.serviceActions(feature),
      ...this.testActions(feature),
      ...this.pageActions(feature),
      ...this.generateIndexActions(feature),
    ].filter(Boolean);
  },

  generateIndexActions: (feature) => {
    const actions = [];

    if (feature.components?.length) {
      actions.push({
        type: "add",
        path: `src/features/${feature.name}/components/index.ts`,
        templateFile: "plop-templates/index.hbs",
        data: { exports: feature.components },
      });
    }

    if (feature.hooks?.length) {
      actions.push({
        type: "add",
        path: `src/features/${feature.name}/hooks/index.ts`,
        templateFile: "plop-templates/index.hbs",
        data: { exports: feature.hooks.map((h) => `use${h}`) },
      });
    }

    if (feature.apiRoutes?.length) {
      actions.push({
        type: "add",
        path: `src/features/${feature.name}/api/index.ts`,
        templateFile: "plop-templates/index.hbs",
        data: { exports: feature.apiRoutes },
      });
    }

    return actions;
  },
};
