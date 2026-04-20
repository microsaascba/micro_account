'use server'

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// 1. Acción para guardar la empresa seleccionada en la sesión
export async function selectCompanyAction(companyId: string) {
  (await cookies()).set('x-company-id', companyId, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
  });
  redirect('/dashboard');
}

// 2. Función REAL para listar empresas desde Cloudflare D1
export async function getUserCompanies() {
  const db = getDb();
  
  // Hacemos un SELECT a la tabla de empresas en nuestra base de datos
  const allCompanies = await db.select().from(companies);

  // Mapeamos los datos para que la interfaz los dibuje correctamente
  return allCompanies.map(c => ({
    id: c.id,
    businessName: c.businessName,
    cuit: c.cuit,
    role: 'SuperAdmin' // Por ahora fijo, luego lo cruzaremos con los permisos reales
  }));
}

// 3. Acción REAL para registrar una nueva empresa y administrador
export async function registerCompanyAction(formData: FormData) {
  const db = getDb();

  const businessName = formData.get('businessName') as string;
  const cuit = formData.get('cuit') as string;
  const taxCondition = formData.get('taxCondition') as string;
  const adminName = formData.get('name') as string;
  const adminEmail = formData.get('email') as string;

  // Simulamos la inserción en base de datos (luego conectaremos Drizzle aquí)
  console.log('=========================================');
  console.log('🚀 NUEVO ALTA DE EMPRESA RECIBIDA');
  console.log('Empresa:', businessName, '| CUIT:', cuit, '| Fiscal:', taxCondition);
  console.log('Admin:', adminName, '| Email:', adminEmail);
  console.log('=========================================');

  // Redirigimos al usuario al selector de empresas (Lobby)
  redirect('/select-company');
}