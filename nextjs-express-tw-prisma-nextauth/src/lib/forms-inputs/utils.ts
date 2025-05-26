import { useState } from "react";

export function logFormData(form: HTMLFormElement) {
  const data = new FormData(form);
  console.log(Object.fromEntries(data));
}


export function useEditToggle(initial = false) {
  const [editing, setEditing] = useState(initial);
  const startEditing = () => setEditing(true);
  const cancelEditing = () => setEditing(false);
  return { editing, startEditing, cancelEditing };
}
