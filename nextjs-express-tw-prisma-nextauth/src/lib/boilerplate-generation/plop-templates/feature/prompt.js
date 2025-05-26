const features = require("../../../features-list.json");
const { generateAllActions } = require("./actions");

module.exports = {
  description: "Generate a new feature with all boilerplate",
  prompts: [
    {
      type: "list",
      name: "featureName",
      message: "Select feature to generate:",
      choices: features.map((f) => f.name),
    },
    {
      type: "checkbox",
      name: "partsToGenerate",
      message: "Select parts to generate:",
      choices: (answers) => {
        const feature = features.find((f) => f.name === answers.featureName);
        const choices = [];

        if (feature.components)
          choices.push({ name: "Components", value: "components" });
        if (feature.apiRoutes)
          choices.push({ name: "API Routes", value: "apiRoutes" });
        if (feature.dbModel)
          choices.push({ name: "Database Models", value: "dbModel" });
        if (feature.hooks) choices.push({ name: "Hooks", value: "hooks" });
        if (feature.store) choices.push({ name: "Store", value: "store" });
        if (feature.zodSchemas)
          choices.push({ name: "Zod Schemas", value: "zodSchemas" });
        if (feature.types) choices.push({ name: "Types", value: "types" });
        if (feature.services)
          choices.push({ name: "Services", value: "services" });
        if (feature.tests) choices.push({ name: "Tests", value: "tests" });
        if (feature.pages) choices.push({ name: "Pages", value: "pages" });

        return choices;
      },
      default: (answers) => {
        const feature = features.find((f) => f.name === answers.featureName);
        return Object.keys(feature).filter(
          (key) =>
            key !== "name" &&
            feature[key] &&
            (Array.isArray(feature[key]) ? feature[key].length > 0 : true)
        );
      },
    },
  ],
  actions: function (data) {
    const featureConfig = features.find((f) => f.name === data.featureName);
    return generateAllActions(featureConfig);
  },
};
