import VehicleRepository from '@/repositories/prisma/VehicleRepository';
import { Vehicle } from '@/types';
import { NextRequest, NextResponse } from 'next/server';

// POST “/vehicle/insert”
export async function POST(request: NextRequest) {

    try {  
        const body = await request.json();
        const { bicycle, color, fuel, manufacturer, model, type, vehicle, vin, vrm } = body;

        const vehicleRepository = new VehicleRepository();

        let vehicleToSave: Vehicle = {
            bicycle: bicycle,
            color: color,
            fuel: fuel,
            manufacturer: manufacturer,
            model: model,
            type: type,
            vehicle: vehicle,
            vin: vin,
            vrm: vrm
        };  

        await vehicleRepository.save(vehicleToSave);

        return NextResponse.json(vehicleToSave, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}