import { useState } from "react";
import { Box, MenuItem, Select, TextField, FormControl, InputLabel } from "@mui/material";
import api from "../../api/api";
import styles from "./ActionForm.module.css";
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
            className={styles.contentContainer}
        >
            <FormControl sx={[selectStyles, { width: "20rem" }]}>
                <InputLabel>Tipo de Ação</InputLabel>
                <Select value={actionType} label="Tipo de Ação" onChange={(e) => setType(e.target.value)}>
                    <MenuItem value="EnterMaintenance">Manutenção</MenuItem>
                    <MenuItem value="Transfer">Transferência</MenuItem>
                    <MenuItem value="Discard">Descarte</MenuItem>
                </Select>
            </FormControl>
            {actionType === "Transfer" && (
                <FormControl sx={[selectStyles, { width: "20rem" }]}>
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
                sx={[textFieldStyles, { width: "20rem" }]}
                inputProps={{ maxLength: "200" }}
            />
            <Box alignSelf="end" sx={{ display:"flex",gap: "1rem" }} >
                <ButtonComponent text="Cancelar" component={Link}  to="/dashboard" />
                <ButtonComponent text="Registrar" type="submit" />
            </Box>
        </Box>
    );
}
