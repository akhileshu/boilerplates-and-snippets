export function logTreeJSON(label: string, tree: unknown) {
  console.group(label);
  console.dir(tree, { depth: null });
  console.log("JSON:", JSON.stringify(tree, null, 2));
  console.groupEnd();
}

export function logFormData(form: HTMLFormElement) {
  const data = new FormData(form);
  console.log(Object.fromEntries(data));
}
