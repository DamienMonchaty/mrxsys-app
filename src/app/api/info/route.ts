import { NextRequest, NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// “/info” : doit retourner cette réponse ci-dessous, les informations (name, description et version)
// doivent être récupérées du package.json
export async function GET() {
     // Read package.json file
     const packageJsonPath = resolve(process.cwd(), 'package.json');
     const packageJsonContent = readFileSync(packageJsonPath, 'utf-8');
     const { name, description, version } = JSON.parse(packageJsonContent);
 
     // Construct response content
     const content = {
         name,
         description,
         version
     };
 
     // Return JSON response
     return NextResponse.json({
         message: "Info retrieved successfully",
         content,
         statusCode: 200
     }, { status: 200 });
}