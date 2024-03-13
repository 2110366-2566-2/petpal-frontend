import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, FormControl, Input, InputAdornment, InputLabel, MenuItem, TextField } from '@mui/material';
import BasicButton from '@/app/_component/BasicButton';

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
  return (
    <main>
        <div className="flex flex-row p-5 gap-2 justify-center"> 
            <Box sx={{ display: 'flex', alignItems: 'flex-end'}}>
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
            <Button variant="contained" className='bg-orange font-semibold'>Search</Button>
        </div>
    </main>
  )
}

