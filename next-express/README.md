### to use nextjs with express custom server

clone boilerplate - `nextjs-tw-prisma-nextauth`
and replace/add contents of this `next-express` boilerplate

update `dev script` in package.json
```json
    "dev": "ts-node --compiler-options '{\"module\":\"CommonJS\"}' src/server.ts"

```