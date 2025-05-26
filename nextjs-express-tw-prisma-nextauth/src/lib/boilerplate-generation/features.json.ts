import { FeatureConfig } from "./types";

export const featuresList: FeatureConfig[] = [
  {
    name: "video",
    components: {
      rendering: [
        {
          name: "video",
          option: {
            generateTestFile: true,
            isEditableView: true,
            renderAsList: false,
          },
        },
        {
          name: "videoPlaylist",
          option: {
            isEditableView: true,
            generateTestFile: false,
            renderAsList: true,
          },
        },
      ],
      forms: {
        create: [
          {
            name: "video",
            option: {
              generateTestFile: true,
            },
          },
          {
            name: "videoPlaylist",
            option: {
              generateTestFile: false,
            },
          },
        ],
        edit: [
          {
            name: "video",
            option: {
              generateTestFile: true,
            },
          },
        ],
        delete: [
          {
            name: "videoPlaylist",
            option: {
              generateTestFile: false,
            },
          },
        ],
      },
      ui: {
        table: [
          {
            name: "videoTable",
            option: {
              generateTestFile: true,
            },
          },
        ],
        modal: [
          {
            name: "confirmDeleteVideo",
            option: {
              generateTestFile: false,
            },
          },
        ],
      },
    },
    serverActions: {
      generateCRUD: true,
      custom: [
        { operation: "read", name: "getTrendingPlaylists" },
        { operation: "create", name: "clonePlaylist" },
      ],
    },
    prismaSchemas: ["Video","VideoPlaylist"],
    zodSchemas: ["video", "videoInput"],
    hooks: ["uploadVideo", "processStatus"],
    types: ["Video"],
    utils: ["formatDuration", "getThumbnail"],
    constants: ["videoStatus"],
    pages: ["/video/[id]", "/video/upload", "/video/(analytics)"],

    // below fields are still not generated and tested
    apiRoutes: ["upload", "process", "get", "delete"],
    store: "useVideoStore",
    messages: ["ADD_SUCCESS", "ADD_ERROR", "REMOVE_SUCCESS"],
    services: ["videoService"], // e.g., for encapsulating business logic
    permissions: ["canUploadVideo", "canDeleteVideo"], // access control layer
    layouts: ["VideoLayout"], // for shared page layout (Next.js)
    providers: ["VideoProvider"], // context/provider (React Context API)
    tests: {
      // todo : can add an option field to generate test files with individual sections like components , serveractions , etc
      components: ["VideoUploadForm.test.tsx"],
      api: ["upload.test.ts"],
      utils: ["formatDuration.test.ts"],
    },
    mockData: ["mockVideoData.ts"], // useful for testing/demo
    env: ["VIDEO_UPLOAD_URL", "MAX_VIDEO_SIZE_MB"], // env var template entries
    readme: true, // optionally generate a README.md per feature
  },
];
