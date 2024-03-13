'use client'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, FormControl, Input, InputAdornment, InputLabel, MenuItem, TextField } from '@mui/material';
import BasicButton from '@/app/_component/BasicButton';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';

export default function Searchbar() {
    const category = [
        {
          value: 'Healthcare',
          label: '🏥 Healthcare',
        },
        {
          value: 'Grooming',
          label: '✂️ Grooming',
        },
        {
          value: 'Pet walking',
          label: '🚶 Pet walking',
        },
        {
          value: 'Others',
          label: '🐾 Others',
        },
      ];
      const sortby = [
        {
          value: 'priceMax',
          label: 'Price MAX to MIN',
        },
        {
          value: 'priceMin',
          label: 'Price MIN to MAX',
        },
        {
          value: 'ratingMax',
          label: 'Rating MAX to MIN',
        },
        {
          value: 'ratingMin',
          label: 'Rating MIN to MAX',
        },
      ];
  return (
    <main>
        <div className="flex flex-row p-5 gap-2 justify-center"> 
            <Box sx={{ display: 'flex', alignItems: 'flex-start'}}>
                <TextField id="input-with-sx" label="Search services" variant="outlined" 
                    className='bg-white'
                    placeholder='Search services...'
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><SearchIcon/></InputAdornment>,
                      }}
                />
            </Box>
            <TextField
                id="select-category"
                select
                label="Select category"
                defaultValue="Healthcare"
                className='bg-white min-w-[160px]'
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
                defaultValue="priceMin"
                className='bg-white min-w-[186px]'
            >
                {sortby.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
        </div>
    </main>
  )
}

