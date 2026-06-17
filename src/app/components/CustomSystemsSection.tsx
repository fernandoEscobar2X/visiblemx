import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  BarChart3,
  Calendar,
  CheckCircle2,
  ClipboardList,
  FileText,
  Package,
  ShieldCheck,
  Users
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const moduleIcons: LucideIcon[] = [Users, Calendar, FileText, Package, ShieldCheck, BarChart3, ClipboardList];

export function CustomSystemsSection() {
  const { language } = useLanguage();

  const content = {
    es: {
      eyebrow: 'Sistemas a medida',
      title: 'Sistemas a medida para operar con más orden',
      subtitle:
        'Cuando una página web ya no es suficiente, construimos plataformas internas para controlar clientes, citas, pedidos, inventario, reportes y procesos del negocio.',
      definition:
        'Un sistema a medida es una herramienta interna diseñada alrededor de cómo trabaja tu negocio. Reúne información, tareas y seguimiento en un flujo claro para que el equipo sepa qué sigue y quién es responsable.',
      fitTitle: 'A quién le sirve',
      fit:
        'A negocios que ya venden, atienden o producen todos los días, pero tienen la operación repartida entre chats, hojas de cálculo, libretas y memoria del equipo.',
      problemsTitle: 'Problemas que ordena',
      modulesTitle: 'Módulos posibles',
      cta: 'Solicitar propuesta',
      note: 'Definimos alcance, prioridades y fases antes de cotizar.',
      problems: [
        'Clientes perdidos entre mensajes.',
        'Citas o pedidos desorganizados.',
        'Inventario en hojas de cálculo.',
        'Seguimiento manual.',
        'Reportes que nadie puede consultar a tiempo.'
      ],
      modules: [
        'Clientes y CRM',
        'Citas y reservaciones',
        'Pedidos y cotizaciones',
        'Inventario',
        'Usuarios y roles',
        'Reportes y dashboards',
        'Automatización de seguimiento'
      ]
    },
    en: {
      eyebrow: 'Custom systems',
      title: 'Custom systems to operate with more order',
      subtitle:
        'When a website is no longer enough, we build internal platforms to control clients, bookings, orders, inventory, reports and business processes.',
      definition:
        'A custom system is an internal tool designed around how your business works. It brings information, tasks and follow-up into a clear flow so the team knows what comes next and who owns it.',
      fitTitle: 'Who it helps',
      fit:
        'For businesses already selling, serving or producing every day, but running operations across chats, spreadsheets, notebooks and team memory.',
      problemsTitle: 'Problems it organizes',
      modulesTitle: 'Possible modules',
      cta: 'Request proposal',
      note: 'We define scope, priorities and phases before quoting.',
      problems: [
        'Clients lost between messages.',
        'Bookings or orders without clear order.',
        'Inventory tracked in spreadsheets.',
        'Manual follow-up.',
        'Reports nobody can check on time.'
      ],
      modules: [
        'Clients and CRM',
        'Bookings and reservations',
        'Orders and quotes',
        'Inventory',
        'Users and roles',
        'Reports and dashboards',
        'Follow-up automation'
      ]
    }
  };

  const t = content[language];

  return (
    <section id="sistemas" className="relative overflow-hidden bg-slate-50 py-24 lg:py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-slate-200" />

      <div className="mx-auto grid max-w-[1400px] gap-16 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-8">
        <div className="max-w-2xl">
          <div className="mb-8 flex items-center gap-3">
            <span className="h-px w-12 bg-slate-900" />
            <span className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">{t.eyebrow}</span>
          </div>

          <h2 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">{t.title}</h2>
          <p className="mt-6 text-lg leading-8 text-slate-600 lg:text-xl">{t.subtitle}</p>

          <div className="mt-10 space-y-8 border-l border-slate-300 pl-6">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500">{t.eyebrow}</h3>
              <p className="mt-3 text-base leading-7 text-slate-700">{t.definition}</p>
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500">{t.fitTitle}</h3>
              <p className="mt-3 text-base leading-7 text-slate-700">{t.fit}</p>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="#contacto"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-4 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-slate-800"
            >
              {t.cta}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <p className="text-sm font-medium leading-6 text-slate-500">{t.note}</p>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="border-t border-slate-300 pt-6">
            <h3 className="text-lg font-black tracking-tight text-slate-900">{t.problemsTitle}</h3>
            <ul className="mt-6 space-y-4">
              {t.problems.map((problem) => (
                <li key={problem} className="flex gap-3 border-b border-slate-200 pb-4 text-base leading-7 text-slate-700">
                  <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-emerald-600" />
                  <span>{problem}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-slate-300 pt-6">
            <h3 className="text-lg font-black tracking-tight text-slate-900">{t.modulesTitle}</h3>
            <ul className="mt-6 space-y-4">
              {t.modules.map((module, index) => {
                const Icon = moduleIcons[index];

                return (
                  <li key={module} className="flex min-h-12 items-center gap-3 border-b border-slate-200 pb-4 text-base font-semibold text-slate-800">
                    <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span>{module}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
