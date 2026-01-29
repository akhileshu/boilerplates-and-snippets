import Table from "cli-table3";
import chalk from "chalk";

type TableOptions = {
  head: string[];
  colWidths?: number[];
};

export type TableCell = Table.Cell;

export const createTable = (options: TableOptions) => {
  return new Table({
    head: options.head.map((h) => chalk.bold(h)),
    colWidths: options.colWidths ?? [],
    style: {
      head: [],
      border: [],
    },
  });
};

/* 
export const testTable = new Table({
  head: ["TH 1 label", "TH 2 label"],
  colWidths: [100, 200],
});

// table is an Array, so you can `push`, `unshift`, `splice` and friends
testTable.push(["First value", "Second value"], ["First value", "Second value"]);
 */