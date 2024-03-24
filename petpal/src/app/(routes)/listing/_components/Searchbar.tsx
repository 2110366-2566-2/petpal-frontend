"use client";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, MenuItem, TextField } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Searchbar() {
  const category = [
    {
      value: "All",
      label: "All",
    },
    {
      value: "Healthcare",
      label: "🏥 Healthcare",
    },
    {
      value: "Grooming",
      label: "✂️ Grooming",
    },
    {
      value: "Pet walking",
      label: "🚶 Pet walking",
    },
    {
      value: "Others",
      label: "🐾 Others",
    },
  ];
  const sortby = [
    {
      value: "serviceName",
      label: "Service name",
    },
    {
      value: "priceMax",
      label: "Price MAX to MIN",
    },
    {
      value: "priceMin",
      label: "Price MIN to MAX",
    },
    {
      value: "ratingMax",
      label: "Rating MAX to MIN",
    },
    {
      value: "ratingMin",
      label: "Rating MIN to MAX",
    },
  ];

  interface SearchbarProps {
    onSearch: (q: string, cat: string, sortBy: string) => void;
  }
  
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleSearch = useDebouncedCallback((term: string)=> {
    const params = new URLSearchParams(searchParams);
    console.log(term)
    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }
    replace(`${pathname}?${params.toString()}`);
  },300);
  const q = searchParams.get("q");
  const cat = searchParams.get("cat");
  const sortBy = searchParams.get("sortBy");
  return (
    <main>
      <div className="flex flex-col min-[600px]:flex-row p-5 gap-2 justify-center">
        <TextField
          id="input-with-sx"
          label="Search services"
          variant="outlined"
          className="bg-white"
          placeholder="search for services.."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          defaultValue={searchParams.get('q') || ''} // Set defaultValue to the value of 'q' from search parameters, or empty string if 'q' is not present
        />
        <TextField
          id="select-category"
          select
          label="Select category"
          className="bg-white min-w-[160px]"
          defaultValue={cat || "All"} // Set defaultValue to "All" if cat is not present
          onChange={(e) => {
            const selectedCategory = e.target.value;
            const params = new URLSearchParams(searchParams);
            if (selectedCategory) {
              params.set("cat", selectedCategory);
            } else {
              params.delete("cat");
            }
            replace(`${pathname}?${params.toString()}`);
          }}
        >
          {category.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="sort-by"
          select
          label="Sort by"
          className="bg-white min-w-[186px]"
          defaultValue={sortBy || "serviceName"} // Set defaultValue to sortBy value or "serviceName" if sortBy is not present
          onChange={(e) => {
            const selectedSortBy = e.target.value;
            const params = new URLSearchParams(searchParams);
            params.set("sortBy", selectedSortBy);
            replace(`${pathname}?${params.toString()}`);
          }}
        >
          {sortby.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </main>
  );
}
