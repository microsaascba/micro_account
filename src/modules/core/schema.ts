import { sqliteTable, text, integer, primaryKey } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

// 1. Usuarios del Sistema
export const users = sqliteTable('users', {
  id: text('id').primaryKey(), // UUID
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  name: text('name').notNull(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
});

// 2. Empresas / Tenants (El eje del sistema)
export const companies = sqliteTable('companies', {
  id: text('id').primaryKey(), // UUID
  businessName: text('business_name').notNull(), // Razón Social
  cuit: text('cuit').notNull().unique(),
  taxCondition: text('tax_condition').notNull(), // RI, Monotributo, Exento
  isActive: integer('is_active', { mode: 'boolean' }).default(true),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
});

// 3. Roles Base
export const roles = sqliteTable('roles', {
  id: text('id').primaryKey(),
  name: text('name').notNull(), // Ej: 'Admin de Empresa', 'Contador'
  description: text('description'),
});

// 4. Relación Usuario <-> Empresa <-> Rol (Autorización Multi-tenant)
export const companyUsers = sqliteTable('company_users', {
  userId: text('user_id').notNull().references(() => users.id),
  companyId: text('company_id').notNull().references(() => companies.id),
  roleId: text('role_id').notNull().references(() => roles.id),
  assignedAt: text('assigned_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
}, (table) => ({
  pk: primaryKey({ columns: [table.userId, table.companyId] }),
}));

// 5. Clientes
export const customers = sqliteTable('customers', {
  id: text('id').primaryKey(), // UUID
  companyId: text('company_id').notNull().references(() => companies.id), // Aislamiento multi-tenant
  businessName: text('business_name').notNull(), // Razón Social
  cuit: text('cuit').notNull(), // CUIT
  taxCondition: text('tax_condition').notNull(), // RI, Monotributo, Exento, Consumidor Final
  email: text('email'),
  address: text('address'),
  isActive: integer('is_active', { mode: 'boolean' }).default(true),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
});

// 6. Proveedores
export const suppliers = sqliteTable('suppliers', {
  id: text('id').primaryKey(), // UUID
  companyId: text('company_id').notNull().references(() => companies.id), // Aislamiento multi-tenant
  businessName: text('business_name').notNull(), // Razón Social
  cuit: text('cuit').notNull(), // CUIT
  taxCondition: text('tax_condition').notNull(), // RI, Monotributo, Exento
  email: text('email'),
  address: text('address'),
  isActive: integer('is_active', { mode: 'boolean' }).default(true),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
});