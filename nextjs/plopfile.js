const { camelCase, pascalCase } = require("change-case");

module.exports = function (plop) {
  // Register eq helper for conditional comparisons
  plop.handlebars.registerHelper("eq", function (a, b) {
    return a === b;
  });

  plop.setGenerator("page", {
    description: "Generate a page boilerplate with flexible options",
    prompts: [
      {
        type: "list",
        name: "pageType",
        message: "Page type",
        choices: ["createNewForm", "renderList", "renderItem", "editForm"],
      },
      {
        type: "confirm",
        name: "needsAuth",
        message: "Needs authorization?",
        default: false,
        when: (answers) => answers.pageType === "editForm",
      },
      {
        type: "confirm",
        name: "needsFilters",
        message: "Needs filters?",
        default: false,
        when: (answers) => answers.pageType === "renderList",
      },
      {
        type: "input",
        name: "filterConfig",
        message: "ex : roomFilterConfig",
        when: (answers) => answers.needsFilters === true,
      },
      {
        type: "input",
        name: "ResourceName",
        message: "Singular resource name (e.g. room, profile)",
      },
      {
        type: "input",
        name: "fetchFn",
        message: "Fetch function name (e.g. getRoomById, getJoinedRooms)",
        when: (answers) => answers.pageType !== "createNewForm",
      },
      {
        type: "input",
        name: "renderFnComponent",
        message:
          "Render function component or form component (e.g. JoinedRooms, EditRoomForm, SetupProfileFormWrapper)",
      },
      {
        type: "input",
        name: "cardTitle",
        message: "Card title",
      },
      {
        type: "input",
        name: "authCheckCondition",
        default: "resource.createdById === session.user.id",
        message:
          "Authorization check condition (e.g. room.createdById === session.user.id)",
        when: (answers) => answers.needsAuth === true,
      },
    ],

    actions: function (data) {
      //   debugger;
      // Helper function: lowercase first letter
      // pluralize (simple): add 's' if not already ending with 's'
      const pluralize = (str) => (str.endsWith("s") ? str : str + "s");

      // derive folder route
      let route = "";
      const resource = camelCase(data.ResourceName); // similar to lowercase
      const resourcePlural = pluralize(resource);
      const resourceService = resource + "Service"; // e.g. roomService
      let filterConfigFull = undefined;
      try {
        filterConfigFull = `${resourceService}.utils.${camelCase(
          data.filterConfig
        )}`;
      } catch (error) {
        // do nothing
      }

      switch (data.pageType) {
        case "createNewForm":
          route = `${resourcePlural}/new`;
          break;
        case "renderList":
          route = resourcePlural;
          break;
        case "renderItem":
          route = `${resourcePlural}/[${resource}Id]`;
          break;
        case "editForm":
          route = `${resourcePlural}/[${resource}Id]/edit`;
          break;
        default:
          route = resourcePlural;
      }

      // build full fetch function reference if needed
      let fetchFnFull = "";
      if (data.pageType !== "createNewForm") {
        // e.g. roomService.queries.getRoomById
        fetchFnFull = `${resourceService}.queries.${camelCase(data.fetchFn)}`;
      }

      // determine full render function
      // heuristic: if renderFnComponent contains "Form" or "Wrapper" -> Forms namespace else Renderers
      let renderNamespace = "Renderers";
      if (
        data.renderFnComponent.includes("Form") ||
        // data.renderFnComponent.includes("Wrapper") ||
        data.pageType === "createNewForm" ||
        data.pageType === "editForm"
      ) {
        renderNamespace = "Forms";
      }

      // e.g. roomService.Forms.EditRoomForm
      //   roomService.Renderers.JoinedRooms
      const renderFnFull = `${resourceService}.${renderNamespace}.${pascalCase(
        data.renderFnComponent
      )}`;

      /**
       * @example
       * parsedData: {
    
    needsFilters: true,
    filterConfig: 'room filter config',
    renderFnComponent: 'joined rooms',
    route: 'rooms',

    // below data will be used in the template

    pageType: 'renderList',
    authCheckCondition: 'placeholder', // if exists - then need auth
    ResourceName: 'room',
    resourcePlural: 'rooms',
    fetchFnFull: 'roomService.queries.getJoinedRooms',
    cardTitle: 'joined rooms',
    serviceName: 'roomService',
    renderFnFull: 'roomService.Renderers.JoinedRooms',
    filterConfigFull: 'roomService.utils.roomFilterConfig' // if exists - then need filters
  }
       */
      const parsedData = {
        ...data,
        route,
        serviceName: resourceService,
        fetchFnFull,
        renderFnComponent: data.renderFnComponent,
        renderFnFull,
        filterConfigFull,
        resourcePlural,
      };

      console.log({ parsedData });

      return [
        {
          type: "add",
          path: `src/app/${route}/page.tsx`,
          templateFile: "other/temp-Important/plop-templates/unified-page.hbs",
          data: parsedData,
        },
      ];
    },
  });
};
