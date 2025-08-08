export interface Equipment {
    id: number;
    name: string;
    serialNumber?: string;
    description?: string;
    state: string;
    branchId: number;
}

export interface Branch {
    id: number;
    name: string;
}

export interface ActionRecord {
    id: number;
    equipmentId: number;
    actionType: string;
    comment?: string;
    date: string;
    performedByUser?: { fullName: string };
    destinationBranch?: Branch;
}
