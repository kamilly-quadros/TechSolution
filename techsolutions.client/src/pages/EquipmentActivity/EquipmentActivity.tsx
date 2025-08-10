import { useParams } from "react-router-dom";
import ActionForm from "../../components/ActionForm/ActionForm";
import Header from "../../components/Header/Header";
import { useEffect, useState, useCallback } from "react";
import type { ActionRecord, Equipment } from "../../types";
import api from "../../api/api";
import { Box, Divider, List, ListItem, ListItemText, Paper, Typography } from "@mui/material";
import styles from "./EquipmentActivity.module.css";

type ActionType = "EnterMaintenance" | "Transfer" | "Discard" | "Other";

export default function EquipmentActivity() {
    const { id } = useParams();
    const [equipment, setEquipment] = useState<Equipment | null>(null);
    const [history, setHistory] = useState<ActionRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const statusEnumMap: Record<ActionType, string> = {
        EnterMaintenance: "Em Manutenção",
        Transfer: "Transferido",
        Discard: "Descartado",
        Other: "Outro"
    };

    const load = useCallback(async () => {
        if (!id) return;
        setLoading(true);
        setError(null);
        try {
            const [eq, hist] = await Promise.all([
                api.get(`/equipments/${id}`),
                api.get(`/actions/equipment/${id}`)
            ]);
            setEquipment(eq.data);
            setHistory(hist.data);
        } catch (e) {
            setError("Erro ao carregar dados do equipamento.");
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        load();
    }, [load]);

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>{error}</p>;
    if (!equipment) return <p>Equipamento não encontrado.</p>;
    
    return (
        <>
            <Header />
            <div className={styles.container}>
                <Paper className={styles.contentContainer}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ color: "var(--secondary-color)" }}>
                        Registrar Ação
                    </Typography>
                    <ActionForm equipmentId={equipment.id} onDone={load} />
                </Paper>
                <Paper className={styles.contentContainer}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ color: "var(--secondary-color)" }}>
                        Histórico
                    </Typography>
                    <List>
                        {history.length > 0 ? (
                            history.map((a, index) => (
                                <Box key={a.id}>
                                    <ListItem disablePadding>
                                        <ListItemText
                                            primaryTypographyProps={{ sx: { color: "var(--secondary-color)", fontWeight:"bold" } }}
                                            secondaryTypographyProps={{ sx: { color: "var(--secondary-color)" } }}
                                            primary={
                                                `${new Date(a.date).toLocaleDateString("pt-BR")} - ${a.actionType === "Transfer"
                                                    ? `Transferido de ${a.sourceBranch?.name ?? "N/A"} para ${a.destinationBranch?.name ?? "N/A"}`
                                                    : statusEnumMap[a.actionType as ActionType] ?? "Desconhecido"
                                                }`
                                            }
                                            secondary={
                                                <>
                                                    {a.comment && <span>{a.comment} — </span>}
                                                    por <strong>{a.performedByUser?.fullName}</strong>
                                                </>
                                            }
                                        />
                                    </ListItem>
                                    {index < history.length - 1 && <Divider sx={{ borderColor: "var(--details)" }} />}
                                </Box>
                            ))
                        ) : (
                            <Typography variant="body2" sx={{ color: "var(--secondary-color)" }}>
                                Nenhum histórico encontrado.
                            </Typography>
                        )}
                    </List>
                </Paper>
            </div>
        </>
    );
}
