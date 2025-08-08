import { useParams } from "react-router-dom";
import ActionForm from "../../components/ActionForm/ActionForm";
import Header from "../../components/Header/Header";
import { useEffect, useState } from "react";
import type { ActionRecord, Equipment } from "../../types";
import api from "../../api/api";
import { Box, Divider, List, ListItem, ListItemText, Paper, Typography } from "@mui/material";

type ActionType = "EnterMaintenance" | "Transfer" | "Discard" | "Other";

export default function EquipmentActivity() {
    const { id } = useParams();
    const [equipment, setEquipment] = useState<Equipment | null>(null);
    const [history, setHistory] = useState<ActionRecord[]>([]);
    const load = async () => {
        const eq = await api.get(`/equipments/${id}`);
        setEquipment(eq.data);
        const hist = await api.get(`/actions/equipment/${id}`);
        setHistory(hist.data);
    };
    const statusEnumMap: Record<ActionType, string> = {
        EnterMaintenance: "Em Manutenção",
        Transfer: "Transferido",
        Discard: "Descartado",
        Other: "Outro"
    };

    useEffect(() => { load(); }, [history]);

    if (!equipment) return <p>Carregando...</p>;

    return (
        <>
            <Header />
            <Paper sx={{ p: 3, mb: 3, display: "flex", flexDirection: "column", alignItems: "center" }}>
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
                                        primary={`${new Date(a.date).toLocaleDateString("pt-BR")} - ${statusEnumMap[a.actionType as ActionType] ?? "Desconhecido"}`}
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
        </>
    );
}