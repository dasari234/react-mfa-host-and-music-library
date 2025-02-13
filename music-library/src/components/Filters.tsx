import React from "react";
import { SortKey } from "../types";

interface FiltersProps {
  sortKey: SortKey;
  onSortChange: (key: SortKey) => void;
  filterValue: string;
  onFilterValueChange: (value: string) => void;
}

export const Filters: React.FC<FiltersProps> = ({
  sortKey,
  onSortChange,
  filterValue,
  onFilterValueChange,
}) => {
  return (
    <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex items-center gap-2">
          <div className="h-5 w-15 text-gray-600">Sort by: </div>
          <select
            data-testid="sortby"
            value={sortKey}
            onChange={(e) => onSortChange(e.target.value as SortKey)}
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="title">Title</option>
            <option value="artist">Artist</option>
            <option value="album">Album</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={filterValue}
            onChange={(e) => onFilterValueChange(e.target.value)}
            placeholder="Search..."
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-2"
          />
        </div>
      </div>
    </div>
  );
};

export default Filters;
