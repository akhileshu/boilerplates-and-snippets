export function createFormDataFromList(
  entries: { label: string; value: string | Blob }[]
): FormData {
  const formData = new FormData();
  for (const { label, value } of entries) {
    formData.append(label, value);
  }
  return formData;
}
