import { CategoryResponse } from "./category.interface";

export interface TicketResponse {
    id: number;
    title: string;
    description: string;
    priority: string;
    status: string;
    createdBy: string;
    assignedTo: string | null;
    category: CategoryResponse;
    createdAt: string;
    updatedAt: string;
    resolvedAt: string | null;
}

export interface TicketRequest {
    title: string;
    description: string;
    priority: string;
    categoryId: number;
}

export interface TicketStatusHistoryResponse {
    id: number;
    previousStatus: string;
    newStatus: string;
    changedBy: string;
    changedAt: string;
}