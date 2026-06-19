import fs from 'fs/promises';
import path from 'path';

// Bu servis, veri tutarlılığını sağlamak için tüm admin ve public read/write işlemlerinde kullanılacak.
const dbPath = path.join(process.cwd(), 'data', 'db.json');

export async function readDB() {
  try {
    const data = await fs.readFile(dbPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error("DB okuma hatası:", error);
    return null;
  }
}

export async function writeDB(data: any) {
  try {
    await fs.writeFile(dbPath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error("DB yazma hatası:", error);
    return false;
  }
}
