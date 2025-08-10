import { useState } from "react";
import { Box, MenuItem, Select, TextField, FormControl, InputLabel, Stack } from "@mui/material";
import api from "../../api/api";
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import { Link } from "react-router-dom";

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
                alignItems: "center",
                gap: 3,
                width: "100%",
                maxWidth: "25rem",
                margin: "0 auto",
            }}
        >
            <FormControl sx={[selectStyles, { width: "100%", maxWidth: "30rem" }]} required>
                <InputLabel id="action-type-id">Tipo de Ação</InputLabel>
                <Select labelId="action-type-id" value={actionType} label="Tipo de Ação" onChange={(e) => setType(e.target.value)}>
                    <MenuItem value="EnterMaintenance">Manutenção</MenuItem>
                    <MenuItem value="Transfer">Transferência</MenuItem>
                    <MenuItem value="Discard">Descarte</MenuItem>
                </Select>
            </FormControl>
            {actionType === "Transfer" && (
                <FormControl sx={[selectStyles, { width: "100%", maxWidth: "30rem" }]} required>
                    <InputLabel id="transfer">Destino</InputLabel>
                    <Select
                        labelId="transfer"
                        value={destinationBranchId ?? ""}
                        onChange={(e) => setDest(Number(e.target.value))}
                        label="Destino"
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
                inputProps={{ maxLength: 200 }}
                sx={textFieldStyles}
            />
            <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
                <ButtonComponent
                    text="Cancelar"
                    component={Link}
                    to="/dashboard"
                    fullWidth
                    sx={{
                        backgroundColor: "var(--primary-color)",
                        color: "var(--secondary-color)",
                        "&:hover": {
                            backgroundColor: "var(--details)",
                            color: "var(--primary-color)",
                        },
                    }}
                />
                <ButtonComponent text="Registrar" type="submit" fullWidth />
            </Stack>
        </Box>
    );
}
