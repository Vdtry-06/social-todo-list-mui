import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import { Item } from "../types";

interface Column {
    id: keyof Item;
    label: string;
    minWidth?: number;
    align?: "right" | "left" | "center";
    format?: (value: any) => string;
}

const columns: readonly Column[] = [
    { id: "id", label: "ID", minWidth: 50, align: "center" },
    { id: "title", label: "Title", minWidth: 170 },
    { id: "description", label: "Description", minWidth: 200 },
    { id: "status", label: "Status", minWidth: 100, align: "center" },
    {
        id: "created_at",
        label: "Created At",
        minWidth: 170,
        align: "right",
        format: (value: string) => new Date(value).toLocaleString(),
    },
];

type ItemTableProps = {
    items: Item[];
    page: number;
    rowsPerPage: number;
    totalItems: number;
    onPageChange: (newPage: number) => void;
    onRowsPerPageChange: (rows: number) => void;
};

export default function ItemTable({
    items,
    page,
    rowsPerPage,
    totalItems,
    onPageChange,
    onRowsPerPageChange,
}: ItemTableProps) {
    const handleChangePage = (event: unknown, newPage: number) => {
        onPageChange(newPage + 1);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        onRowsPerPageChange(+event.target.value);
    };

    return (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
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
                                        backgroundColor: "#1976d2",
                                        color: "white",
                                        fontWeight: "bold",
                                        borderRight:
                                            index < columns.length - 1
                                                ? "1px solid rgba(224, 224, 224, 1)"
                                                : "none",
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
                                                        ? "1px solid rgba(224, 224, 224, 1)"
                                                        : "none",
                                                borderBottom: "1px solid rgba(224, 224, 224, 1)",
                                            }}
                                        >
                                            {column.format && value ? column.format(value) : value}
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
    );
}