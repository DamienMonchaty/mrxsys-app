import B2 from 'backblaze-b2';
import { NextRequest, NextResponse } from 'next/server';

// Configuration de Backblaze B2
const b2 = new B2({
  applicationKeyId: '00588270881b62a0000000001',
  applicationKey: 'K005b3zpn2tUWr3usRczbuOwG5vCHrg'
});
const bucketName = 'Mrx-DamBucket';

// Middleware de gestion du téléchargement de fichiers avec multer
export const config = {
  api: {
    bodyParser: false // Désactive le bodyParser intégré de Next.js pour utiliser multer
  }
};

// Fonction de gestion de l'envoi de fichiers
export async function POST(request: NextRequest) {
  // Parse the incoming form data
  const formData = await request.formData();

  // Get the file from the form data
  const file = formData.get('file') as File;
  const fileToStorage = file;

  if (!fileToStorage) {
    return NextResponse.json({ error: 'Aucun fichier trouvé.' }, { status: 400 });
  }

  const buffer = Buffer.from(await fileToStorage.arrayBuffer());
  const filename =  fileToStorage.name;

  try {
    // Connexion à Backblaze B2
    await b2.authorize();

    const response = await b2.getUploadUrl({
      bucketId: '5898a297307808018bf6021a',
    });

    // Télécharger le fichier sur Backblaze B2
    await b2.uploadFile({
      fileName: filename,
      data: buffer,
      uploadUrl: response.data.uploadUrl,
      uploadAuthToken: response.data.authorizationToken,
    });

    // // Supprimer le fichier local après le téléchargement
    // await fs.promises.unlink(filePath);

    return NextResponse.json({ message: 'Fichier téléchargé avec succès sur Backblaze B2', content: response.data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
