import mongoose from "mongoose";

export interface BaseRepository<TData extends object> {
    create(data: TData): Promise<TData>;
    findAll(): Promise<TData[]>;
    findById(id: string): Promise<TData | null>;
    update(id: string, data: mongoose.UpdateQuery<TData>): Promise<TData | null>;
    delete(id: string): Promise<TData | null>;
    findAllPaginatedWithFilter<TFilter = unknown>(
        filter: TFilter,
        page: number,
        limit: number
    ): Promise<TData[]>;
}
