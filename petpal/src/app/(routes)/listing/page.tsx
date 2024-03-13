'use client'
import React from "react";
import { redirect } from 'next/navigation';
import { usePathname } from 'next/navigation';
import Searchbar from "./_components/Searchbar";
import Searchresult from "./_components/Searchresult";
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, FormControl, Input, InputAdornment, InputLabel, MenuItem, TextField } from '@mui/material';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';

interface Column {
    id: 'serviceName' | 'serviceType' | 'price' | 'rating';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
  }
  
  const columns: readonly Column[] = [
    { id: 'serviceName', label: 'Service Name', minWidth: 50 },
    { id: 'serviceType', label: 'Service Type', minWidth: 50 },
    {
      id: 'price',
      label: 'Price',
      minWidth: 50,
      align: 'right',
      format: (value: number) => value.toLocaleString('en-US'),
    },
    {
      id: 'rating',
      label: 'Rating',
      minWidth: 50,
      align: 'right',
      format: (value: number) => value.toLocaleString('en-US'),
    },
  ];
  
  interface Data {
    serviceName: string;
    serviceType: string;
    price: number;
    rating: number;
  }
  
  function createData(
    serviceName: string,
    serviceType: string,
    price: number,
    rating: number,
  ): Data {
    return { serviceName, serviceType, price, rating };
  }
  
  const rows = [
    createData('India', 'IN', 1324171354, 3287263),
    createData('China', 'CN', 1403500365, 9596961),
    createData('Italy', 'IT', 60483973, 301340),
    createData('United States', 'US', 327167434, 9833520),
    createData('Canada', 'CA', 37602103, 9984670),
    createData('Australia', 'AU', 25475400, 7692024),
    createData('Germany', 'DE', 83019200, 357578),
    createData('Ireland', 'IE', 4857000, 70273),
    createData('Mexico', 'MX', 126577691, 1972550),
    createData('Japan', 'JP', 126317000, 377973),
    createData('France', 'FR', 67022000, 640679),
    createData('United Kingdom', 'GB', 67545757, 242495),
    createData('Russia', 'RU', 146793744, 17098246),
    createData('Nigeria', 'NG', 200962417, 923768),
    createData('Brazil', 'BR', 210147125, 8515767),
  ];

export default async function ServiceListing(){
    const currentPage = usePathname();
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
      const [page, setPage] = React.useState(0);
      const [rowsPerPage, setRowsPerPage] = React.useState(10);
    
      const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };
    
    return (
        <main>
            <div>
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
                    <Button variant="contained" className='bg-orange font-semibold'>Search</Button>
                </div>
            </div>
            <div className="flex flex-row p-5 justify-center">
                <Paper sx={{ width: '50%', overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: 470 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                            <TableCell
                                key={column.id}
                                align={column.align}
                                style={{ minWidth: column.minWidth }}
                            >
                                {column.label}
                            </TableCell>
                            ))}
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.serviceName}>
                                {columns.map((column) => {
                                    const value = row[column.id];
                                    return (
                                    <TableCell key={column.id} align={column.align}>
                                        {column.format && typeof value === 'number'
                                        ? column.format(value)
                                        : value}
                                    </TableCell>
                                    );
                                })}
                                </TableRow>
                            );
                            })}
                        </TableBody>
                    </Table>
                    </TableContainer>
                    <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
        </main>
    )
}