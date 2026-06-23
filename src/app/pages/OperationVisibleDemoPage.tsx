import { OperationVisibleDemo } from '../components/demo/operacion-visible/OperationVisibleDemo';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

export function OperationVisibleDemoPage() {
  useDocumentMeta(
    'Operación Visible — Demo | VisibleMX',
    'Descubre cómo transformamos el caos operativo en un sistema claro y conectado.'
  );

  return (
    <main className="min-h-screen bg-[#0A1128] pt-20 pb-12 overflow-hidden flex flex-col">
      <div className="flex-1 flex items-center justify-center">
         <OperationVisibleDemo />
      </div>
    </main>
  );
}
