'use server'

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getDb } from '../../lib/db';
import { companies, users, companyUsers } from './schema';


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

  // A. Insertamos la Empresa en la base de datos
  const newCompany = await db.insert(companies).values({
    id: crypto.randomUUID(), // <-- Agregamos la generación del ID
    businessName,
    cuit,
    taxCondition,
  }).returning();

  const companyId = newCompany[0].id;

// B. Insertamos el Usuario Administrador
  const newUser = await db.insert(users).values({
    id: crypto.randomUUID(),
    name: adminName,
    email: adminEmail,
    passwordHash: 'contraseña_temporal_123', // <-- AGREGAMOS EL CAMPO FALTANTE
  }).returning();

  const userId = newUser[0].id;

  // C. Vinculamos al Usuario con la Empresa asignándole el Rol
  await db.insert(companyUsers).values({
    companyId,
    userId,
    roleId: 'superadmin',
  });

  // Redirigimos al Lobby para ver la empresa recién creada
  redirect('/select-company');
}