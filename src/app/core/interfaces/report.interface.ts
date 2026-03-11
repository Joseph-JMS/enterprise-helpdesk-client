export interface SummaryResponse {
    totalTickets: number;
    open: number;
    inProgress: number;
    resolved: number;
    closed: number;
    cancelled: number;
}

export interface CategoryReportResponse {
    categoryName: string;
    totalTickets: number;
}

export interface TechnicianReportResponse {
    technicianUsername: string;
    assignedTickets: number;
    resolvedTickets: number;
}

export interface PriorityReportResponse {
    priority: string;
    totalTickets: number;
}

export interface AverageResolutionResponse {
    prioriry: string;
    averageHours: number;
}

export interface SlaReportResponse {
    priority: string;
    thresholdHours: number;
    totalTickets: number;
    withinSla: number;
    breachedSla: number;
    compliancePercentage: number;
}
