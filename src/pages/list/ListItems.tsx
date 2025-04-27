import useItemListFetcher from "../../hooks/useItemListFetcher";
import ItemTable from "../../components/ItemTable";
import StatusFilter from "../../components/StatusFilter";

export default function ListItems() {
    const {
        items,
        page,
        setPage,
        rowsPerPage,
        setRowsPerPage,
        status,
        setStatus,
        totalItems,
        loading,
        error,
    } = useItemListFetcher(5);

    return (
        <div style={{ padding: "20px" }}>
            <StatusFilter status={status} onStatusChange={setStatus} />
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : items.length === 0 ? (
                <p>No items found.</p>
            ) : (
                <ItemTable
                    items={items}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    totalItems={totalItems}
                    onPageChange={setPage}
                    onRowsPerPageChange={(rows) => {
                        setRowsPerPage(rows);
                        setPage(1);
                    }}
                />
            )}
        </div>
    );
}