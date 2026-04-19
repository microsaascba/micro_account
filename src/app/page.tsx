import { redirect } from 'next/navigation';

export default function HomePage() {
  // Cuando alguien entra a la raíz del sistema, lo mandamos directo al Lobby
  redirect('/select-company');
}