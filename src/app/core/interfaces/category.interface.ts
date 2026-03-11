export interface CategoryResponse {
    id: number;
    name: string;
    description: string | null;
    enabled: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CategoryRequest {
    name: string;
    description: string;
}