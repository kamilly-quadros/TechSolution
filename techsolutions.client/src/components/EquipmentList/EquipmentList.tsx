import { useEffect, useState } from "react";
import api from "../../api/api";
import type { Equipment } from "../../types";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { useTheme, useMediaQuery } from "@mui/material";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Stack,
    Tooltip,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from "@mui/material";

export default function EquipmentList() {
    const [equipments, setEquipments] = useState<Equipment[]>([]);
    const [openDelete, setOpenDelete] = useState(false);
    const [equipmentToDelete, setEquipmentToDelete] = useState<Equipment | null>(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const load = async () => {
        try {
            const res = await api.get("/equipments");
            setEquipments(res.data);
        } catch (error) {
            console.error("Erro ao carregar equipamentos:", error);
        }
    };
    const handleDeleteClick = (equipment: Equipment) => {
        setEquipmentToDelete(equipment);
        setOpenDelete(true);
    };
    const handleConfirmDelete = async () => {
        if (equipmentToDelete) {
            await api.delete(`/equipments/${equipmentToDelete.id}`);
            setEquipments((prev) => prev.filter(e => e.id !== equipmentToDelete.id));
        }
        setOpenDelete(false);
        setEquipmentToDelete(null);
    };
    const handleCancelDelete = () => {
        setOpenDelete(false);
        setEquipmentToDelete(null);
    };

    useEffect(() => { load(); }, []);

    return (
        <>
            {!isMobile ? (
                <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: "bold" }}>Nome</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }}>Número de Série</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }}>Estado</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }}>Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {equipments.map((e) => (
                                <TableRow key={e.id}>
                                    <TableCell>{e.name}</TableCell>
                                    <TableCell>{e.serialNumber}</TableCell>
                                    <TableCell>{e.state}</TableCell>
                                    <TableCell>
                                        <Stack direction="row" spacing={1}>
                                            <Tooltip title="Ver detalhes">
                                                <IconButton
                                                    component={Link}
                                                    to={`/equipment/${e.id}`}
                                                    size="small"
                                                    sx={{ color: "var(--secondary-color)" }}
                                                >
                                                    <VisibilityIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Editar">
                                                <IconButton
                                                    component={Link}
                                                    to={`/equipment/edit/${e.id}`}
                                                    sx={{ color: "var(--details)" }}
                                                    size="small"
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Registrar atividade">
                                                <IconButton
                                                    component={Link}
                                                    to={`/equipment/${e.id}/log-activity`}
                                                    size="small"
                                                    sx={{ color: "var(--details-light)" }}
                                                >
                                                    <NoteAddIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Excluir">
                                                <IconButton
                                                    onClick={() => handleDeleteClick(e)}
                                                    color="error"
                                                    size="small"
                                                    sx={{
                                                        outline: "none",
                                                        "&:focus": {
                                                            outline: "none",
                                                        },
                                                        "&:focus-visible": {
                                                            outline: "none",
                                                        }
                                                    }}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>

                                            </Tooltip>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Stack spacing={2}>
                    {equipments.map((e) => (
                        <Paper key={e.id} sx={{ p: 2 }}>
                            <strong>{e.name}</strong>
                            <div><b>Número de Série: </b>{e.serialNumber}</div>
                            <div><b>Estado: </b>{e.state}</div>
                            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                                <Tooltip title="Ver detalhes">
                                    <IconButton
                                        component={Link}
                                        to={`/equipment/${e.id}`}
                                        size="small"
                                        sx={{ color: "var(--secondary-color)" }}
                                    >
                                        <VisibilityIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Editar">
                                    <IconButton
                                        component={Link}
                                        to={`/equipment/edit/${e.id}`}
                                        sx={{ color: "var(--details)" }}
                                        size="small"
                                    >
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Registrar atividade">
                                    <IconButton
                                        component={Link}
                                        to={`/equipment/${e.id}/log-activity`}
                                        size="small"
                                        sx={{ color: "var(--details-light)" }}
                                    >
                                        <NoteAddIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Excluir">
                                    <IconButton
                                        onClick={() => handleDeleteClick(e)}
                                        color="error"
                                        size="small"
                                        sx={{
                                            outline: "none",
                                            "&:focus": {
                                                outline: "none",
                                            },
                                            "&:focus-visible": {
                                                outline: "none",
                                            }
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>

                                </Tooltip>
                            </Stack>
                        </Paper>
                    ))}
                </Stack>
            )}
            <Dialog open={openDelete} onClose={handleCancelDelete}>
                <DialogTitle>Confirmar exclusão</DialogTitle>
                <DialogContent>
                    <DialogContent>
                        Tem certeza que deseja excluir o equipamento{" "}
                        <strong>{equipmentToDelete?.name}</strong>?
                        Esta ação não poderá ser desfeita.
                    </DialogContent>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelDelete}>Cancelar</Button>
                    <Button onClick={handleConfirmDelete} color="error" variant="contained">
                        Excluir
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
