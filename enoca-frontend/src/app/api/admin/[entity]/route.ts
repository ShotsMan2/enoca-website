import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';

export async function GET(request: Request, { params }: { params: Promise<{ entity: string }> }) {
  const { entity } = await params;
  const db = await readDB();
  
  if (!db) return NextResponse.json({ error: 'DB okunamadı' }, { status: 500 });
  
  if (db[entity] !== undefined) {
    return NextResponse.json(db[entity]);
  }
  
  return NextResponse.json({ error: 'Böyle bir entity yok' }, { status: 404 });
}

export async function POST(request: Request, { params }: { params: Promise<{ entity: string }> }) {
  const { entity } = await params;
  const db = await readDB();
  
  if (!db) return NextResponse.json({ error: 'DB okunamadı' }, { status: 500 });
  
  try {
    const data = await request.json();
    db[entity] = data; // Tüm objeyi/array'i üzerine yazar
    
    const success = await writeDB(db);
    if (success) {
      return NextResponse.json({ success: true, data: db[entity] });
    }
    return NextResponse.json({ error: 'DB yazılamadı' }, { status: 500 });
  } catch (err) {
    return NextResponse.json({ error: 'Geçersiz JSON verisi' }, { status: 400 });
  }
}
