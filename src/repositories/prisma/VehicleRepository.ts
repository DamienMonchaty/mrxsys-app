import { Vehicle } from "@/types";
import BaseRepository from "./BaseRepository";
import prisma from "@/lib/prisma";

export default class VehicleRepository extends BaseRepository<Vehicle> {

    constructor(){
        super(prisma.vehicle);
    }
}