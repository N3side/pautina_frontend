export interface Source {
    id: string | number;
    variant: string;
}

export interface SourceDto {
    source_id: string | number | null;
    source: string | null;
}