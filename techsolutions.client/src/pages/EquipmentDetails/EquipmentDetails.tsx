import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";
import type { Equipment, ActionRecord } from "../../types";
import { Container, Paper, Typography, Box, List, ListItem, ListItemText, Divider } from "@mui/material";
import Header from "../../components/Header/Header";
import ActionForm from "../../components/ActionForm/ActionForm";


export default function EquipmentDetails() {
    const { id } = useParams();
    const [equipment, setEquipment] = useState<Equipment | null>(null);
    const [history, setHistory] = useState<ActionRecord[]>([]);
    const load = async () => {
        const eq = await api.get(`/equipments/${id}`);
        setEquipment(eq.data);
        const hist = await api.get(`/actions/equipment/${id}`);
        setHistory(hist.data);
    };

    useEffect(() => { load(); }, []);

    if (!equipment) return <p>Carregando...</p>;

    return (
        <>
            <Header />
            <Container maxWidth="md" sx={{ mt: 3, mb: 5, color: "var(--secondary-color)" }}>
                <Paper sx={{ p: 3, mb: 3}}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ color: "var(--secondary-color)" }}>
                        {equipment.name}
                    </Typography>
                    <Typography variant="body1" sx={{ color: "var(--secondary-color)" }}>
                        Número de série: <strong>{equipment.serialNumber}</strong>
                    </Typography>
                    <Typography variant="body1" sx={{ color: "var(--secondary-color)" }}>
                        Estado: <strong>{equipment.state}</strong>
                    </Typography>
                </Paper>
                <Paper sx={{ p: 3, mb: 3, display: "flex", flexDirection: "column", alignItems:"center" }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ color: "var(--secondary-color)" }}>
                        Registrar Ação
                    </Typography>
                    <ActionForm equipmentId={equipment.id} onDone={load} />
                </Paper>
                <Paper sx={{ p: 3 }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ color: "var(--secondary-color)" }}>
                        Histórico
                    </Typography>
                    <List>
                        {history.length > 0 ? (
                            history.map((a, index) => (
                                <Box key={a.id}>
                                    <ListItem disablePadding>
                                        <ListItemText
                                            primaryTypographyProps={{ sx: { color: "var(--secondary-color)" } }}
                                            secondaryTypographyProps={{ sx: { color: "var(--secondary-color)" } }}
                                            primary={`${new Date(a.date).toLocaleDateString("pt-BR")} - ${a.actionType}`}
                                            secondary={
                                                <>
                                                    {a.comment && <span>{a.comment} — </span>}
                                                    por <strong>{a.performedByUser?.fullName}</strong>
                                                </>
                                            }
                                        />
                                    </ListItem>
                                    {index < history.length - 1 && <Divider />}
                                </Box>
                            ))
                        ) : (
                                <Typography variant="body2" sx={{ color: "var(--secondary-color)" }}>
                                Nenhum histórico encontrado.
                            </Typography>
                        )}
                    </List>
                </Paper>
            </Container>
        </>
    );
}
