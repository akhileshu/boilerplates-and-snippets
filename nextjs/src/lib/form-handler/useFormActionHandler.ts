import React, { startTransition } from "react";

  /**
   * @bugFix
   * if didn't prevent default
   * after form submit , scheduleType radio button checked state was getting set to "INSTANT" - default initial state , even if scheduleType state was recurring / scheduled
   * 
   * handleSubmit prevents this behaviour
   * - Related components: ScheduleSection, CreateRoomForm
   */
export function useFormActionHandler(formAction: (formData: FormData) => void) {
  return (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    startTransition(() => {
      formAction(formData);
    });
  };
}

// both functions (useFormActionHandler & handleSubmit) do same
/*
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    startTransition(() => {
      formAction(formData);
    });
  };
*/
