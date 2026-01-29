{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  // "include": [
  //   "next-env.d.ts",
  //   "**/*.ts",
  //   "**/*.tsx",
  //   "src/**/*.ts",
  //   "src/**/*.tsx",
  //   ".next/types/**/*.ts",
  //   "plopfile.js",
  //   "plopfile.ts",
  //   "src/server.ts",
  //   "test.js",
  //   "plopfile.ts"
  // ],
  "include": [
    "next-env.d.ts",
    "next.config.ts",
    // "src/{app,services}/**/*.{ts,tsx}",
    "src/**/*.ts",
    "src/**/*.tsx",
    "data",
    ".next/types/**/*.ts"
  ],
  "exclude": [
    "node_modules/**/*",
    ".next/**/*",
    "cypress/**/*",
    "**/*.spec.ts",
    "dist/**/*",
    "build/**/*",
    // project specific
    "other/**",
    "src/lib/__internal__/**",
    "**/__internal__/**" // ignore internal files
  ]
}
