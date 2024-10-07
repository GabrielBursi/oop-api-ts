import mongoose from "mongoose";
import { BaseRepository } from "../interfaces";

export class GenericRepository<TData extends object>
    implements BaseRepository<TData> {
    private readonly model: mongoose.Model<TData>;

    constructor(model: mongoose.Model<TData>) {
        this.model = model;
    }

    async create(data: TData): Promise<TData> {
        return this.model.create(data);
    }

    async findAll(): Promise<TData[]> {
        return this.model.find().exec();
    }

    async findById(id: string): Promise<TData | null> {
        return this.model.findById(id).exec();
    }

    async update(id: string, data: mongoose.UpdateQuery<TData>): Promise<TData | null> {
        return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    async delete(id: string): Promise<TData | null> {
        return this.model.findByIdAndDelete(id).exec();
    }

    async findAllPaginatedWithFilter(
        filter: any,
        page: number,
        limit: number
    ): Promise<TData[]> {
        return this.model
            .find(filter)
            .skip((page - 1) * limit)
            .limit(limit)
            .exec();
    }
}