import ora from "ora";

export const withSpinner = async <T>(
  text: string,
  fn: () => Promise<T>
): Promise<T> => {
  const spinner = ora(text).start();
  try {
    const result = await fn();
    spinner.succeed();
    return result;
  } catch (e) {
    spinner.fail();
    throw e;
  }
};
