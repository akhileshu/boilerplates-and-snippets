const templateBasePath = "src/lib/boilerplate-generation/plop-templates";
const t = (path: string) => `${templateBasePath}/${path}`;

export const templatePaths = {
  components: {
    renderServer: t("/components/render-server.hbs"),
    renderClient: t("/components/render-client.hbs"),
    formCreate: t("/components/form-create.hbs"),
    formEdit: t("/components/form-edit.hbs"),
    formDelete: t("/components/form-delete.hbs"),
    uiTable: t("/components/ui-table.hbs"),
    uiModal: t("/components/ui-modal.hbs"),
  },
  serverActions: {
    serverActionsCRUD: t("/server-actions/serverActionsCRUD.hbs"),
    serverActionsCustom: t("/server-actions/serverActionsCustom.hbs"),
    serverActionsIndex: t("/server-actions/index.hbs"),
  },
  routes: {
    page: t("/page-route.hbs"),
  },
  zodSchema: t("/zod-schema.hbs"),
  hook: t("/hook.hbs"),
  type: t("/type.hbs"),
  util: t("/util.hbs"),
  constant: t("/constant.hbs"),
  prismaModel: t("/prisma-model.hbs"),

  // untested
  apiTest: t("/api-test.hbs"),
  service: t("/service.hbs"),
  componentTest: t("/component-test.hbs"),
  apiRoute: t("/api-route.hbs"),
  index: t("/index.hbs"),
  store: t("/store.hbs"),
  component: t("/component.hbs"),
  e2e: t("/e2e-test.hbs"),
};
