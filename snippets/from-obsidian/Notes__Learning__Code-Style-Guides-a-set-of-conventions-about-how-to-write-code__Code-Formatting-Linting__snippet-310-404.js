import { dirname } from "path";

import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";

import importPlugin from "eslint-plugin-import";

  

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

  

const compat = new FlatCompat({

baseDirectory: __dirname,

});

  

const eslintConfig = [

...compat.extends("next/core-web-vitals", "next/typescript"),

{

plugins: { import: importPlugin },

settings: {

"import/resolver": {

node: { extensions: [".js", ".jsx", ".ts", ".tsx"] },

typescript: {

alwaysTryTypes: true,

project: "./tsconfig.json",

},

},

},

rules: {

"@/no-restricted-imports": [

"error",

{

paths: [

{

name: "@/components/app/card",

message: "Import from '@/index/components' instead.",

},

{

name: "@/components/app/SubmitButton",

message: "Import from '@/index/components' instead.",

},

],

patterns: ["@/components/app/*"], // Block direct imports

},

],

},

},

];

  

export default eslintConfig;