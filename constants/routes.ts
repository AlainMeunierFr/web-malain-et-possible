export const ROUTES = {
  HOME: '/',
  ABOUT: '/a-propos-du-site',
  SITEMAP: '/plan-du-site',
  TRANSFORMATION: '/transformation',
  DETOURNEMENT_VIDEO: '/detournement-video',
  ROBUSTESSE: '/robustesse',
  FAISONS_CONNAISSANCE: '/faisons-connaissance',
  METRICS: '/metrics',
  MAINTENANCE: '/maintenance',
  INGENIERIE_LOGICIEL: '/ingenierie-logiciel',
} as const;

export type Route = typeof ROUTES[keyof typeof ROUTES];

export const COMMANDS = {
  EMAIL: 'cmd-email',
  YOUTUBE: 'cmd-YouTube',
  LINKEDIN: 'cmd-Linkedin',
  SITEMAP: 'cmd-PlanDuSite',
  ABOUT_SITE: 'cmd-AProposDuSite',
  METRICS: 'cmd-Metrics',
  FAISONS_CONNAISSANCE: 'cmd-FaisonsConnaissance',
} as const;

export type Command = typeof COMMANDS[keyof typeof COMMANDS];
