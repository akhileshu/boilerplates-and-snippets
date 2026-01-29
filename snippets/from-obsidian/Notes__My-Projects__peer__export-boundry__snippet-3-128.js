  {
    plugins: {
      boundaries,
    },
    settings: {
      "boundaries/include": ["src/**/*"],

      "boundaries/elements": [
        {
          type: "shared",
          mode: "full",
          pattern: [
            "src/components/index.ts",
            "src/lib/index.ts",
            // "src/services/**/*",
          ],
        },
        {
          type: "service",
          mode: "full",
          capture: ["serviceName"],
          pattern: ["src/services/*/**/*"], // src/services/profiles , profiles is our serviceName
        },
        {
          type: "lib-submodule",
          mode: "full",
          capture: ["libFolder"],
          pattern: ["src/lib/*/**/*"],
        },
        {
          type: "lib-index",
          mode: "full",
          capture: ["libIndex"],
          pattern: ["src/lib"],
        },
        {
          type: "component-submodule",
          mode: "full",
          capture: ["componentFolder"],
          pattern: ["src/components/*/**/*"],
        },
        {
          type: "component-index",
          mode: "full",
          capture: ["componentIndex"],
          pattern: ["src/components/index.ts"],
        },
        {
          type: "app",
          mode: "full",
          capture: ["_", "fileName"],
          pattern: ["src/app/**/*"],
        },
        {
          mode: "full",
          type: "neverImport",
          pattern: ["src/*", "src/tasks/**/*"], // ex : src/middleware.ts
        },
      ],
    },
    rules: {
      "boundaries/no-unknown": ["error"], // never import something that is not (labeled / is a type )in "boundaries/elements": []
      "boundaries/no-unknown-files": ["error"], // everysingle fine from  "boundaries/include": ["src/**/*"], should be in "boundaries/elements": []
      "boundaries/element-types": [
        "error",
        {
          default: "disallow",
          rules: [
            // {
            //   from: ["shared"],
            //   allow: ["shared"],
            // },
            {
              from: ["lib-submodule"],
              allow: [["lib-submodule", { libFolder: "${from.libFolder}" }]],
            },
            {
              from: ["shared"],
              // allow: [["lib-submodule", "component-submodule"]],
            },
            {
              from: ["component-submodule"],
              allow: [
                [
                  "component-submodule",
                  { componentFolder: "${from.componentFolder}" },
                ],
              ],
            },
            // {
            //   from: ["component-index"],
            //   allow: [
            //     [
            //       "component-submodule",
            //       { componentFolder: "${from.componentFolder}" },
            //     ],
            //   ],
            // },
            {
              from: ["service-submodule"],
              allow: [
                [
                  "service-submodule",
                  { serviceFolder: "${from.serviceFolder}" },
                ],
              ],
            },
            {
              from: ["feature"],
              allow: [
                "shared",
                ["feature", { featureName: "${from.featureName}" }],
              ],
            },
            {
              from: ["app"],
              allow: ["shared", "feature", ["app", { fileName: "*.css" }]],
            },
          ],
        },
      ],
    },
  },
