import { selectCompanyAction, getUserCompanies } from '../../modules/core/actions';
import { Building2, ChevronRight, LogOut, PlusCircle, Building } from 'lucide-react';
import Link from 'next/link';

export default async function SelectCompanyPage() {
  // Obtenemos las empresas directamente en el servidor
  const companies = await getUserCompanies();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Barra de navegación superior simple */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 text-slate-800 font-bold text-xl">
          <Building className="w-6 h-6 text-blue-600" />
          <span>ERP Cloud</span>
        </div>
        <button className="text-slate-500 hover:text-slate-800 flex items-center gap-2 text-sm font-medium transition-colors">
          <LogOut className="w-4 h-4" />
          Cerrar Sesión
        </button>
      </header>

      {/* Contenedor principal */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-6 md:p-12">
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Seleccionar Empresa</h1>
            <p className="text-slate-500 mt-2">
              Elegí el entorno de trabajo para iniciar tu sesión operativa.
            </p>
          </div>
          
          <Link href="/register-company" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            <PlusCircle className="w-4 h-4" />
            Nueva Empresa
          </Link>
        </div>

        {/* Grilla de empresas */}
        <div className="grid grid-cols-1 gap-4">
          {companies.map((company) => (
            <form key={company.id} action={selectCompanyAction.bind(null, company.id)}>
              <button
                type="submit"
                className="w-full bg-white border border-slate-200 rounded-xl p-5 flex items-center justify-between hover:border-blue-500 hover:shadow-md transition-all group text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-slate-100 text-slate-600 p-3 rounded-lg group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">{company.businessName}</h2>
                    <div className="flex items-center gap-3 mt-1 text-sm text-slate-500">
                      <span className="font-mono">CUIT: {company.cuit}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                      <span className="bg-slate-100 px-2 py-0.5 rounded text-xs font-medium border border-slate-200">
                        Rol: {company.role}
                      </span>
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </button>
            </form>
          ))}
        </div>
      </main>
    </div>
  );
}