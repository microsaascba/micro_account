import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ERP Contable Cloud',
  description: 'Sistema de gestión contable multiempresa',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      {/* Acá agregamos suppressHydrationWarning para bloquear el error de tu extensión */}
      <body suppressHydrationWarning className="bg-slate-50">
        {children}
      </body>
    </html>
  );
}