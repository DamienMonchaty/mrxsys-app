import { Vehicle } from "@/types";
import { PrismaClient } from "@prisma/client/extension";

export default abstract class BaseRepository<T> {
    constructor(protected prisma: PrismaClient){}

    getAll(options: Record<string, any> = {}): Promise<Array<T>> {
        return this.prisma.findMany(options);
    }

    count(): Promise<number> {
        return this.prisma.count(); 
    }

    save(newData: T): Promise<T> {
        return this.prisma.create({
            data: {
                ...newData
            }
        });
    }

    getById(id: number): Promise<T> {
        return this.prisma.findUnique({
            where: {
                id: id,
            }
        });
    }

    delete(id: number): Promise<T> {
        return this.prisma.delete({
            where: {
                id: id,
            }
        });
    }

    edit(id: number, newData: T): Promise<T> {
        return this.prisma.update({
            where: {
                id: id,
            },
            data: {
                ...newData
            }
        });
    }
}