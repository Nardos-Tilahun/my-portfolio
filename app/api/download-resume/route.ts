// app/api/download-resume/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const resumeUrl = process.env.NEXT_PUBLIC_RESUME_URL || '';
  
  try {
    // Fetch the PDF from Cloudinary
    const response = await fetch(resumeUrl);
    
    if (!response.ok) {
      throw new Error('Failed to fetch resume');
    }
    
    // Get the file as an array buffer
    const fileBuffer = await response.arrayBuffer();
    
    // Create a new response with the file content
    const newResponse = new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Nardos_Tilahun_Resume.pdf"',
        'Content-Length': fileBuffer.byteLength.toString(),
      },
    });
    
    return newResponse;
  } catch (error) {
    console.error('Error downloading resume:', error);
    return new NextResponse('Error downloading resume', { status: 500 });
  }
}