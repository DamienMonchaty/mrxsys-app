import VehicleRepository from '@/repositories/prisma/VehicleRepository';
import { NextRequest, NextResponse } from 'next/server';

// GET “/vehicle/all”
export async function GET() {  
    const vehicleRepository = new VehicleRepository();
    const vehicles = await vehicleRepository.getAll(); 
     // Return JSON response
     return NextResponse.json({
         message: "Vehicles retrieved successfully",
         content: vehicles,
         statusCode: 200
     }, { status: 200 });
}