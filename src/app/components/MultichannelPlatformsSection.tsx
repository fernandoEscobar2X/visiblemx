import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  FileText,
  Globe,
  Laptop,
  Layers,
  Monitor,
  ShieldCheck,
  Smartphone,
  Users
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

type Channel = {
  title: string;
  description: string;
  Icon: LucideIcon;
};

const moduleIcons: LucideIcon[] = [Users, ShieldCheck, Layers, BarChart3];
const scenarioIcons: LucideIcon[] = [Globe, Monitor, BarChart3, Laptop, Building2];

export function MultichannelPlatformsSection() {
  const { language } = useLanguage();

  const content = {
    es: {
      eyebrow: 'Plataformas multicanal',
      title: 'Plataformas multicanal conectadas a una misma operación',
      subtitle:
        'Creamos sistemas que pueden funcionar desde web, computadora o celular, para que administradores, empleados o clientes consulten y actualicen información desde el canal que necesitan.',
      centralLabel: 'Información central',
      centralText: 'Un mismo registro operativo para evitar duplicidad, errores y seguimiento disperso.',
      channelsTitle: 'Canales conectados',
      modulesTitle: 'Estructura de crecimiento',
      scenariosTitle: 'Ejemplos de uso',
      cta: 'Solicitar propuesta',
      note: 'Se define por fases, roles y prioridades del negocio.',
      channels: [
        {
          title: 'Web para administración y control',
          description: 'Paneles para revisar operación, clientes, citas, pedidos y reportes.',
          Icon: Globe
        },
        {
          title: 'Móvil para consulta y seguimiento',
          description: 'Acceso rápido para atender, actualizar estados o consultar información en movimiento.',
          Icon: Smartphone
        },
        {
          title: 'Escritorio para operación interna',
          description: 'Herramientas de trabajo cuando el equipo necesita una experiencia enfocada en oficina o mostrador.',
          Icon: Monitor
        }
      ] as Channel[],
      modules: ['Usuarios y permisos', 'Módulos por proceso', 'Crecimiento por etapas', 'Reportes para decidir'],
      scenarios: [
        'Un cliente agenda desde web.',
        'El equipo da seguimiento desde un panel.',
        'Un administrador revisa reportes.',
        'Un empleado actualiza pedidos, citas o inventario.',
        'El negocio crece por módulos o sucursales.'
      ]
    },
    en: {
      eyebrow: 'Multichannel platforms',
      title: 'Multichannel platforms connected to one operation',
      subtitle:
        'We build systems that can work from web, desktop or mobile, so admins, employees or clients can view and update information from the channel they need.',
      centralLabel: 'Central information',
      centralText: 'One operational record to avoid duplication, errors and scattered follow-up.',
      channelsTitle: 'Connected channels',
      modulesTitle: 'Growth structure',
      scenariosTitle: 'Use examples',
      cta: 'Request proposal',
      note: 'Defined by phases, roles and business priorities.',
      channels: [
        {
          title: 'Web for administration and control',
          description: 'Panels to review operations, clients, bookings, orders and reports.',
          Icon: Globe
        },
        {
          title: 'Mobile for consultation and follow-up',
          description: 'Fast access to serve, update statuses or check information on the move.',
          Icon: Smartphone
        },
        {
          title: 'Desktop for internal operation',
          description: 'Work tools when the team needs a focused experience at the office or counter.',
          Icon: Monitor
        }
      ] as Channel[],
      modules: ['Users and permissions', 'Modules by process', 'Growth by stages', 'Reports for decisions'],
      scenarios: [
        'A client books from the web.',
        'The team follows up from a panel.',
        'An admin reviews reports.',
        'An employee updates orders, bookings or inventory.',
        'The business grows by modules or locations.'
      ]
    }
  };

  const t = content[language];

  return (
    <section id="plataformas" className="relative overflow-hidden bg-slate-900 py-24 text-white lg:py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-white/10" />

      <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <div>
            <div className="mb-8 flex items-center gap-3">
              <span className="h-px w-12 bg-white" />
              <span className="text-xs font-bold uppercase tracking-[0.24em] text-white/60">{t.eyebrow}</span>
            </div>

            <h2 className="max-w-3xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">{t.title}</h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70 lg:text-xl">{t.subtitle}</p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href="#contacto"
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 text-sm font-bold uppercase tracking-wide text-slate-900 transition-colors hover:bg-slate-100"
              >
                {t.cta}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <p className="text-sm font-medium leading-6 text-white/50">{t.note}</p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 sm:p-8 lg:p-10">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
              <div className="space-y-4">
                {t.channels.slice(0, 2).map((channel) => (
                  <ChannelBlock key={channel.title} channel={channel} />
                ))}
              </div>

              <div className="relative flex justify-center py-2 lg:h-full lg:w-44 lg:items-center">
                <div className="hidden h-full w-px bg-white/10 lg:block" />
                <div className="relative z-10 w-full rounded-2xl border border-white/15 bg-slate-950 p-5 text-center shadow-[0_20px_50px_rgba(2,6,23,0.28)] lg:absolute lg:left-1/2 lg:w-44 lg:-translate-x-1/2">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-white/15 bg-white/5">
                    <FileText className="h-6 w-6 text-emerald-300" />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-200">{t.centralLabel}</p>
                  <p className="mt-3 text-sm leading-6 text-white/60">{t.centralText}</p>
                </div>
              </div>

              <div className="space-y-4">
                {t.channels.slice(2).map((channel) => (
                  <ChannelBlock key={channel.title} channel={channel} />
                ))}

                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                  <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white/50">{t.modulesTitle}</h3>
                  <ul className="mt-5 grid gap-3">
                    {t.modules.map((module, index) => {
                      const Icon = moduleIcons[index];

                      return (
                        <li key={module} className="flex min-h-11 items-center gap-3 text-sm font-semibold text-white/80">
                          <span className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border border-white/10 bg-slate-950">
                            <Icon className="h-4 w-4 text-emerald-300" />
                          </span>
                          <span>{module}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="mb-6 flex items-center gap-3">
            <Laptop className="h-5 w-5 text-emerald-300" />
            <h3 className="text-lg font-black tracking-tight text-white">{t.scenariosTitle}</h3>
          </div>

          <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {t.scenarios.map((scenario, index) => {
              const Icon = scenarioIcons[index];

              return (
                <li key={scenario} className="flex gap-3 border-l border-white/10 pl-4 text-sm leading-6 text-white/70">
                  <Icon className="mt-1 h-4 w-4 flex-shrink-0 text-emerald-300" />
                  <span>{scenario}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

function ChannelBlock({ channel }: { channel: Channel }) {
  const { Icon } = channel;

  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-slate-950 text-emerald-300">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="text-base font-black tracking-tight text-white">{channel.title}</h3>
      <p className="mt-3 text-sm leading-6 text-white/60">{channel.description}</p>
    </article>
  );
}
