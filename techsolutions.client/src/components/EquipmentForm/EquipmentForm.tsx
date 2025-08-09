import { useEffect, useState } from "react";
import api from "../../api/api";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Header/Header";
import styles from "./EquipmentForm.module.css";
import { Box, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

interface EquipmentFormProps {
    disabled?: boolean;
}

export default function EquipmentForm({ disabled = false }: EquipmentFormProps) {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [serialNumber, setSerial] = useState("");
    const [description, setDesc] = useState("");
    const [branchId, setBranchId] = useState(1);
    const navigate = useNavigate();
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
    const save = async (e: React.FormEvent) => {
        e.preventDefault();
        if (id) {
            await api.put(`/equipments/${id}`, { name, serialNumber, description, branchId });
        } else {
            await api.post("/equipments", { name, serialNumber, description, branchId });
        }
        navigate("/dashboard");
    };

    useEffect(() => {
        if (id) {
            api.get(`/equipments/${id}`).then((res) => {
                setName(res.data.name);
                setSerial(res.data.serialNumber);
                setDesc(res.data.description);
                setBranchId(res.data.branchId);
            });
        }
    }, [id]);

    return (
        <>
            <Header />
            <Box className={styles.container}>
                <Box className={styles.contentContainer}>
                    <form onSubmit={save}>
                        <Typography variant="h5" gutterBottom mb={4}>
                            {disabled
                                ? "Visualizar Equipamento"
                                : id
                                    ? "Editar Equipamento"
                                    : "Cadastrar Equipamento"}
                        </Typography>
                        <Stack direction="column" spacing={2} justifyContent="center" alignContent="center" alignItems="center">
                            <TextField
                                label="Nome"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                variant="standard"
                                sx={[textFieldStyles, { width: "20rem" }]}
                                margin="normal"
                                required
                                inputProps={{ maxLength: "100" }}
                                disabled={disabled}
                            />
                            <TextField
                                label="Número de Série"
                                value={serialNumber}
                                onChange={(e) => setSerial(e.target.value)}
                                variant="standard"
                                sx={[textFieldStyles, { width: "20rem" }]}
                                margin="normal"
                                required
                                inputProps={{ maxLength: "100" }}
                                disabled={disabled}
                            />
                            <TextField
                                label="Descrição"
                                multiline
                                minRows={2}
                                value={description}
                                onChange={(e) => setDesc(e.target.value)}
                                fullWidth
                                sx={[textFieldStyles, { width: "20rem" }]}
                                required
                                inputProps={{ maxLength: "200" }}
                                disabled={disabled}
                            />
                            <FormControl variant="standard" margin="normal" required sx={{ width: "20rem", ...selectStyles }} disabled={disabled}>
                                <InputLabel>Filial</InputLabel>
                                <Select
                                    value={branchId}
                                    onChange={(e) => setBranchId(Number(e.target.value))}
                                >
                                    <MenuItem value={1}>Matriz</MenuItem>
                                    <MenuItem value={2}>Filial 1</MenuItem>
                                </Select>
                            </FormControl>
                            <Box alignSelf="end" sx={{ marginRight: "10rem" }}>
                                {(!disabled
                                    ? [
                                        { text: "Cancelar", to: "/dashboard" },
                                        { text: "Salvar", type: "submit" as const }
                                    ]
                                    : [
                                        { text: "Voltar", to: "/dashboard" }
                                    ]
                                ).map(({ text, to, type }) => (
                                    <ButtonComponent
                                        key={text}
                                        component={to ? Link : undefined}
                                        to={to}
                                        type={type}
                                        sx={{
                                            marginTop: "1rem",
                                            marginRight: "1rem",
                                        }}
                                    >
                                        {text}
                                    </ButtonComponent>
                                ))}
                            </Box>
                        </Stack>
                    </form>
                </Box>
            </Box>
        </>
    );
}
