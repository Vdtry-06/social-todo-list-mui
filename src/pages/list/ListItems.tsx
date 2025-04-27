import { useEffect, useState } from "react";
import { listItems } from '../../services/apiServices';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

interface Item {
    id: number;
    created_at: string;
    updated_at: string;
    title: string;
    description: string;
    status: string;
}

interface Column {
    id: keyof Item;
    label: string;
    minWidth?: number;
    align?: 'right' | 'left' | 'center';
    format?: (value: any) => string;
}

const columns: readonly Column[] = [
    { id: 'id', label: 'ID', minWidth: 50, align: 'center' },
    { id: 'title', label: 'Title', minWidth: 170 },
    { id: 'description', label: 'Description', minWidth: 200 },
    { id: 'status', label: 'Status', minWidth: 100, align: 'center' },
    {
        id: 'created_at',
        label: 'Created At',
        minWidth: 170,
        align: 'right',
        format: (value: string) => new Date(value).toLocaleString(),
    },
];

export default function ListItems() {
    const [items, setItems] = useState<Item[]>([]);
    const [page, setPage] = useState<number>(1);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [status, setStatus] = useState<string | undefined>(undefined);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchItems = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await listItems({ page, status, limit: rowsPerPage });
                setItems(response.data);
                setTotalItems(response.paging.total);
                setRowsPerPage(response.paging.limit);
            } catch (err) {
                setError('Failed to fetch items. Please try again later.');
                console.error('Failed to fetch items:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, [page, status, rowsPerPage]);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage + 1);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(1);
    };

    const handleStatusChange = (newStatus: string) => {
        setStatus(newStatus || undefined);
        setPage(1);
    };

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ marginBottom: '1rem' }}>
                <FormControl sx={{ minWidth: 120 }} size="small">
                    <InputLabel id="demo-select-small-label">Status</InputLabel>
                    <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={status || ''}
                        label="Status"
                        onChange={(e) => handleStatusChange(e.target.value)}
                        sx={{
                            '& .MuiSelect-select': {
                                padding: '8px 24px 8px 12px',
                            },
                        }}
                    >
                        <MenuItem value="">
                            <em>All</em>
                        </MenuItem>
                        <MenuItem value="Doing">Doing</MenuItem>
                        <MenuItem value="Done">Done</MenuItem>
                        <MenuItem value="Deleted">Deleted</MenuItem>
                    </Select>
                </FormControl>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : items.length === 0 ? (
                <p>No items found.</p>
            ) : (
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column, index) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{
                                                minWidth: column.minWidth,
                                                backgroundColor: '#1976d2',
                                                color: 'white',
                                                fontWeight: 'bold',
                                                borderRight:
                                                    index < columns.length - 1
                                                        ? '1px solid rgba(224, 224, 224, 1)'
                                                        : 'none',
                                            }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {items.map((item) => (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={item.id}>
                                        {columns.map((column, index) => {
                                            const value = item[column.id];
                                            return (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                    sx={{
                                                        borderRight:
                                                            index < columns.length - 1
                                                                ? '1px solid rgba(224, 224, 224, 1)'
                                                                : 'none',
                                                        borderBottom: '1px solid rgba(224, 224, 224, 1)',
                                                    }}
                                                >
                                                    {column.format && value
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 15]}
                        component="div"
                        count={totalItems}
                        rowsPerPage={rowsPerPage}
                        page={page - 1}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            )}
        </div>
    );
}