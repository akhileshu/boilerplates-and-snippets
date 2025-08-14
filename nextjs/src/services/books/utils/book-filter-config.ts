import { defineFilterConfig } from "@/lib/filter-sort-handler/filters-and-sort";
import { ExtractFilterValues } from "@/lib/filter-sort-handler/types";

// Example: Categories you sell
const categoryList = [
  { id: "fiction", label: "Fiction" },
  { id: "nonfiction", label: "Non-fiction" },
  { id: "comics", label: "Comics" },
  { id: "education", label: "Educational" },
  { id: "children", label: "Children" },
];

// Example: Conditions for used books
const conditionList = [
  "new",
  "likeNew",
  "veryGood",
  "good",
  "acceptable",
] as const;

export const bookFilterConfig = {
  availability: defineFilterConfig({
    label: "Availability",
    options: ["all", "inStock", "outOfStock"] as const,
    fallback: "all",
  }),
  category: defineFilterConfig({
    label: "Category",
    options: ["all", ...categoryList.map((c) => c.id)] as const,
    fallback: "all",
  }),
  condition: defineFilterConfig({
    label: "Condition",
    options: ["all", ...conditionList] as const,
    fallback: "all",
  }),
  priceRange: defineFilterConfig({
    label: "Price Range",
    options: ["all", "under500", "500to1000", "1000plus"] as const,
    fallback: "all",
  }),
  sort: defineFilterConfig({
    label: "Sort By",
    options: [
      "priceLowToHigh",
      "priceHighToLow",
      "newestFirst",
      "oldestFirst",
      "titleAsc",
      "titleDesc",
    ] as const,
    fallback: "newestFirst",
  }),
};

export type BookFilterValues = ExtractFilterValues<typeof bookFilterConfig>;
