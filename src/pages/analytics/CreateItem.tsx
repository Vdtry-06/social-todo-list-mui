import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { RequestItem } from "../../types";
import { createItems } from "../../services/apiServices";

export default function CreateItem() {
    const [formData, setFormData] = useState<RequestItem>({
        title: "",
        description: "",
        status: "",
    });
    const [error, setError] = useState<string | null>(null);
    const [successResponse, setSuccessResponse] = useState<{ data: number } | null>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name as string]: value as string,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccessResponse(null);

        if (!formData.status) {
            setError("Please select a status.");
            setTimeout(() => {
                setError(null);
            }, 3000);
            return;
        }

        try {
            const response = await createItems(formData);
            setSuccessResponse(response);
            setFormData({ title: "", description: "", status: "" });
            setTimeout(() => {
                setSuccessResponse(null);
            }, 3000);
        } catch (err) {
            setError("Failed to create item. Please try again.");
            console.error("Error creating item:", err);
            setTimeout(() => {
                setError(null);
            }, 3000);
        }
    };

    return (
        <Box sx={{ maxWidth: 900, mx: "auto", mt: 4, p: 2 }}>
            <form onSubmit={handleSubmit} noValidate autoComplete="off">
                {error && <Alert severity="error" sx={{ mb: 2, width: '100%' }}>{error}</Alert>}
                {successResponse && (
                    <Alert severity="success" sx={{ mb: 2, width: '100%' }}>
                        Item created with ID: {successResponse.data}
                    </Alert>
                )}
                <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 2 }}>
                    <TextField
                        id="filled-title-input"
                        label="Title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        autoComplete="current-title"
                        variant="filled"
                        sx={{
                            width: '20ch',
                            '& .MuiFilledInput-root': {
                                height: '56px',
                            },
                        }}
                    />
                    <TextField
                        id="filled-description-input"
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        autoComplete="current-description"
                        variant="filled"
                        sx={{
                            width: '20ch',
                            '& .MuiFilledInput-root': {
                                height: '56px',
                            },
                        }}
                    />
                    <FormControl variant="filled" sx={{ width: '20ch' }}>
                        <InputLabel id="status-select-label">Status</InputLabel>
                        <Select
                            labelId="status-select-label"
                            id="filled-status-input"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            label="Status"
                            sx={{
                                height: '56px',
                            }}
                        >
                            <MenuItem value="" disabled>
                                <em>Select Status</em>
                            </MenuItem>
                            <MenuItem value="Doing">Doing</MenuItem>
                            <MenuItem value="Done">Done</MenuItem>
                            <MenuItem value="Deleted">Deleted</MenuItem>
                        </Select>
                    </FormControl>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{
                            width: '20ch',
                            height: '56px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        Create Item
                    </Button>
                </Box>
            </form>
        </Box>
    );
}