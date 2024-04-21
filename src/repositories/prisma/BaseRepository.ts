import { PrismaClient } from "@prisma/client/extension";

export default abstract class BaseRepository<T> {
    constructor(protected prisma: PrismaClient){}

    getAll(options: Record<string, any> = {}): Promise<Array<T>> {
        return this.prisma.findMany(options);
    }
}