import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

type StatusFilterProps = {
    status: string | undefined;
    onStatusChange: (newStatus: string | undefined) => void;
};

export default function StatusFilter({ status, onStatusChange }: StatusFilterProps) {
    return (
        <div style={{ marginBottom: "1rem" }}>
            <FormControl sx={{ minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small-label">Status</InputLabel>
                <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={status || ""}
                    label="Status"
                    onChange={(e) => onStatusChange(e.target.value || undefined)}
                    sx={{
                        "& .MuiSelect-select": {
                            padding: "8px 24px 8px 12px",
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
    );
}