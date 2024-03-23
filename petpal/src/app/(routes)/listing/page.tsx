'use client'
import React, { useEffect, useState } from "react";
import Searchbar from "@app/(routes)/listing/_components/Searchbar";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import getServices from "@/app/libs/service/getServices";

interface Column {
    id: 'serviceName' | 'serviceType' | 'price' | 'rating';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
  }
  
  const columns: readonly Column[] = [
    { id: 'serviceName', label: 'Service Name', minWidth: 50 },
    { id: 'serviceType', label: 'Service Type', minWidth: 40 },
    {
      id: 'price',
      label: 'Price',
      minWidth: 40,
      align: 'right',
      format: (value: number) => value.toLocaleString('en-US'),
    },
    {
      id: 'rating',
      label: 'Rating',
      minWidth: 40,
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
  
  //const rows: any[] = [
    /*createData('serviceName0', 'Healthcare', 16.58, 21.90),
    createData('serviceName1', 'Grooming', 51.26, 15.54),
    createData('serviceName2', 'Pet walking', 71.62, 67.07),
    createData('serviceName3', 'Healthcare', 16.99, 31.90),
    createData('serviceName4', 'Grooming', 51.00, 15.44),
    createData('serviceName5', 'Pet walking', 70.62, 77.07),
    createData('serviceName6', 'Healthcare', 17.28, 21.99),
    createData('serviceName7', 'Grooming', 45.76, 15.54),
    createData('serviceName8', 'Pet walking', 81.62, 67.07),
    createData('serviceName9', 'Healthcare', 46.58, 11.90),
    createData('serviceName10', 'Grooming', 57.26, 15.59),
    createData('serviceName11', 'Pet walking', 71.61, 67.07),
    createData('serviceName12', 'Healthcare', 46.58, 21.90),
    createData('serviceName13', 'Grooming', 91.86, 45.44),
    createData('serviceName14', 'Pet walking', 81.12, 27.07),
    createData('serviceName15', 'Healthcare', 11.07, 21.10),
    createData('serviceName16', 'Grooming', 51.26, 15.54),
    createData('serviceName17', 'Pet walking', 21.24, 78.23),
    createData('serviceName18', 'Others', 88.23, 11.12),
    createData('serviceName19', 'Others', 18.13, 59.20),
    createData('serviceName20', 'Others', 58.93, 17.78),
    createData('serviceName21', 'Others', 26.89, 28.12),
    createData('serviceName22', 'Others', 69.69, 8.12),*/
  //];

export default function ServiceListing({
  searchParams
}:{
  searchParams?: {
    q?:string;
    cat?:string;
    sortBy?:string;
  }
}){
      const [page, setPage] = React.useState(0);
      const [rowsPerPage, setRowsPerPage] = React.useState(10);
      const [rows, setRows] = useState<any[]>([]); // Initialize rows state

      useEffect(() => {
        async function fetchData() {
          try {
            const data = await getServices();
            console.log(data);
            const newData = data.map((service: any) => createData(
              service.services.serviceName,
              service.services.serviceType,
              service.services.price,
              service.services.averageRating
            ));
            setRows(newData); // Set rows state with new data
          } catch (error) {
            console.error("Error fetching data:", error);
            // Handle error
          }
        }
    
        fetchData(); // Call fetchData when component mounts
      }, []); // Empty dependency array to run effect only once on mount
      
      const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };
      const search = searchParams?.q || '';
      const cat = searchParams?.cat || '';
      const sortBy = searchParams?.sortBy || '';
    return (
        <main>
            <Searchbar/>
            <main className='flex flex-row p-5 justify-center'>
                <Paper sx={{ width: '90%', overflow: 'hidden', maxWidth: 700 }}>
                    <TableContainer sx={{ maxHeight: 470 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead className="bg-gray">
                        <TableRow>
                            {columns.map((column) => (
                            <TableCell
                                key={column.id}
                                align={column.align}
                                style={{ minWidth: column.minWidth}}
                                className="text-cream text-base font-bold bg-orange"
                            >
                                {column.label}
                            </TableCell>
                            ))}
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows
                            .filter((row: { serviceName: string; })=> {
                                return search.toLowerCase() === ''
                                ? row 
                                : row.serviceName.toLowerCase().includes(search);
                            })
                            .filter((row: { serviceType: string | string[]; })=> {
                                return cat === 'All'
                                ? row 
                                : row.serviceType.includes(cat);
                            })
                            .sort((b: { price: any; rating: any; serviceName: number; }, a: { price: any; rating: any; serviceName: number; }) => {
                                if (sortBy === 'priceMax') {
                                    return (a.price || 0) - (b.price || 0);
                                } else if (sortBy === 'priceMin') {
                                    return (b.price || 0) - (a.price || 0);
                                } else if (sortBy === 'ratingMax') {
                                    return (a.rating || 0) - (b.rating || 0);
                                } else if (sortBy === 'ratingMin') {
                                    return (b.rating || 0) - (a.rating || 0);
                                } else if (sortBy === 'serviceName') {
                                    if (a.serviceName < b.serviceName) return 1;
                                    if (a.serviceName > b.serviceName) return -1;
                                    return 0;
                                }
                                return 0; // Default case
                            })
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row: { [x: string]: any; serviceName: React.Key | null | undefined; }) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.serviceName}
                                  className="hover:cursor-pointer">
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
            </main>     
        </main>
    )
}


