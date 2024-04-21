import VehicleRepository from '@/repositories/prisma/VehicleRepository';
import { Vehicle } from '@/types';
import { NextRequest, NextResponse } from 'next/server';

// GET “/vehicle/get/:id”
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        
        if (!id) {
            return NextResponse.json({ error: 'Missing Id' }, { status: 400 });
        }

        const vehicleRepository = new VehicleRepository();

        const vehicle = await vehicleRepository.getById(parseInt(id));

        if (!vehicle) {
            return NextResponse.json({ error: 'Vehicle Not Found with : ' + id }, { status: 404 });
        }

        return NextResponse.json(vehicle, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

