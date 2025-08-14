"use client";

import { Hash } from "lucide-react";
import React, { useState } from "react";
import Label from "../label";
import Chip from "../ui-labels/chip";

type Props = {
  name: string;
  initialTags?: string[];
};

/**
 * - `<TagsInput name="tags" initialTags={["workshop", "online"]} />`
 * - `<TagsInput name="tags" />`
 */
export const TagsInput: React.FC<Props> = ({ name, initialTags = [] }) => {


  const [tags, setTags] = useState<string[]>(initialTags);
  const [tagInput, setTagInput] = useState("");

  const addTag = () => {
    const newTag = tagInput.trim();
    if (newTag && !tags.includes(newTag)) {
      setTags((prev) => [...prev, newTag]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  return (
    <div className="space-y-4">
      <Label icon={<Hash className="h-5 w-5 text-indigo-500" />} label="Tags" />

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Chip key={tag} label={tag} onRemove={() => removeTag(tag)} />
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addTag();
            }
          }}
          className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Add tag..."
        />
        <button
          type="button"
          onClick={addTag}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      {/* Hidden input for form submission */}
      <input type="hidden" name={name} value={JSON.stringify(tags)} />
    </div>
  );
};
