import VehicleRepository from '@/repositories/prisma/VehicleRepository';
import { NextRequest, NextResponse } from 'next/server';

// GET “/vehicle/all”
// GET “/vehicle/all?page=1&pageSize=10”
export async function GET(request: NextRequest) {

    const url = new URL(request.url)

    const page = parseInt(url.searchParams.get("page") ?? "1");
    const pageSize = parseInt(url.searchParams.get("pageSize") ?? "10");

    const vehicleRepository = new VehicleRepository();

    const offset = (page - 1) * pageSize;

    const vehicles = await vehicleRepository.getAll({
        skip: offset,
        take: pageSize,
    });

    const totalCount = await vehicleRepository.count(); // Compte le nombre total d'éléments dans la base de données

    // Return JSON response
    return NextResponse.json({
        message: "Vehicles retrieved successfully",
        content: vehicles,
        totalCount: totalCount,
        statusCode: 200
    }, { status: 200 });
}