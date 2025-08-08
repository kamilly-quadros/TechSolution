import { useState } from "react";
import { Box, Button, MenuItem, Select, TextField, FormControl, InputLabel } from "@mui/material";
import api from "../../api/api";

interface Props {
    equipmentId: number;
    onDone: () => void;
}

export default function ActionForm({ equipmentId, onDone }: Props) {
    const [actionType, setType] = useState("EnterMaintenance");
    const [comment, setComment] = useState("");
    const [destinationBranchId, setDest] = useState<number | undefined>();
    const selectStyles = {
        "& .MuiInputLabel-root": {
            color: "var(--secondary-color)",
        },
        "& .MuiInputLabel-root.Mui-focused": {
            color: "var(--secondary-color)",
        },
        "& .MuiSelect-select": {
            color: "var(--details)",
        },
        "& .MuiInput-underline:before": {
            borderBottomColor: "var(--secondary-color)",
        },
        "& .MuiInput-underline:hover:before": {
            borderBottomColor: "var(--secondary-color)",
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "var(--details)",
        },
    };
    const textFieldStyles = {
        "& .MuiInputLabel-root": {
            color: "var(--secondary-color)",
        },
        "& .MuiInputLabel-root.Mui-focused": {
            color: "var(--secondary-color)",
        },
        "& .MuiInputBase-input": {
            color: "var(--details)",
        },
        "& .MuiInput-underline:before": {
            borderBottomColor: "var(--secondary-color)",
        },
        "& .MuiInput-underline:hover:before": {
            borderBottomColor: "var(--secondary-color)",
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "var(--details)",
        },
    };
    const save = async (e: React.FormEvent) => {
        e.preventDefault();
        await api.post("/actions", { equipmentId, actionType, comment, destinationBranchId });
        onDone();
    };

    return (
        <Box
            component="form"
            onSubmit={save}
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                maxWidth: 900,
                minWidth: 300,
                p: 3
            }}
        >
            <FormControl fullWidth sx={selectStyles}>
                <InputLabel>Tipo de Ação</InputLabel>
                <Select value={actionType} label="Tipo de Ação" onChange={(e) => setType(e.target.value)}>
                    <MenuItem value="EnterMaintenance">Manutenção</MenuItem>
                    <MenuItem value="Transfer">Transferência</MenuItem>
                    <MenuItem value="Discard">Descarte</MenuItem>
                </Select>
            </FormControl>
            {actionType === "Transfer" && (
                <FormControl fullWidth sx={selectStyles}>
                    <InputLabel>Destino</InputLabel>
                    <Select
                        value={destinationBranchId ?? ""}
                        label="Destino"
                        onChange={(e) => setDest(Number(e.target.value))}
                    >
                        <MenuItem value={2}>Filial 1</MenuItem>
                        <MenuItem value={1}>Matriz</MenuItem>
                    </Select>
                </FormControl>
            )}
            <TextField
                label="Comentário"
                multiline
                minRows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                fullWidth
                sx={textFieldStyles}
            />
            <Button type="submit" variant="contained" sx={{
                backgroundColor: "var(--secondary-color)",
                "&:hover": {
                    backgroundColor: "var(--secondary-color-medium)",
                    color: "var(--primary-color)"
                },
            }}>
                Registrar
            </Button>
        </Box>
    );
}
