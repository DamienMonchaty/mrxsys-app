import VehicleRepository from '@/repositories/prisma/VehicleRepository';
import { Vehicle } from '@/types';
import { NextRequest, NextResponse } from 'next/server';

// PUT “/vehicle/put/:id”
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        
        if (!id) {
            return NextResponse.json({ error: 'Missing Id' }, { status: 400 });
        }

        const vehicleRepository = new VehicleRepository();

        let vehicleToEdit: Vehicle = await vehicleRepository.getById(parseInt(id));

        if (!vehicleToEdit) {
            return NextResponse.json({ error: 'Vehicle Not Found with : ' + id }, { status: 404 });
        }

        const body = await request.json();
        const { bicycle, color, fuel, manufacturer, type, vehicle, vin, vrm } = body;

        vehicleToEdit = {
            bicycle: bicycle,
            color: color,
            fuel: fuel,
            manufacturer: manufacturer,
            type: type,
            vehicle: vehicle,
            vin: vin,
            vrm: vrm
        };

        const vehicleEdited = await vehicleRepository.edit(parseInt(id), vehicleToEdit);

        return NextResponse.json(vehicleEdited, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

