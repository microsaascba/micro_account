'use server'

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// 1. Acción para guardar la empresa seleccionada en una Cookie y entrar al sistema
export async function selectCompanyAction(companyId: string) {
  // En Next.js 15, cookies() es asíncrono, por eso usamos await
  (await cookies()).set('x-company-id', companyId, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
  });
  
  redirect('/dashboard');
}

// 2. Función temporal (Mock) para listar empresas. 
// Luego la conectaremos a Drizzle y a nuestra tabla 'company_users'.
export async function getUserCompanies() {
  return [
    { id: 'uuid-1', businessName: 'Estudio Contable Gómez & Asoc.', cuit: '30-71234567-8', role: 'SuperAdmin' },
    { id: 'uuid-2', businessName: 'Tech Solutions SRL', cuit: '30-87654321-0', role: 'Contador' },
    { id: 'uuid-3', businessName: 'Ferretería Industrial Norte', cuit: '33-12345678-9', role: 'Administrativo Ventas' }
  ];
}

// 3. Acción para registrar una nueva empresa y administrador
export async function registerCompanyAction(formData: FormData) {
  // Extraemos los datos que el usuario escribió en los inputs
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