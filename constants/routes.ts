export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  SITEMAP: '/site-map',
  TRANSFORMATION: '/transformation',
  DETOURNEMENT_VIDEO: '/detournement-video',
  ROBUSTESSE: '/robustesse',
  FAISONS_CONNAISSANCE: '/faisons-connaissance',
  METRICS: '/metrics',
} as const;

export type Route = typeof ROUTES[keyof typeof ROUTES];

export const COMMANDS = {
  EMAIL: 'cmd-email',
  YOUTUBE: 'cmd-YouTube',
  LINKEDIN: 'cmd-Linkedin',
  SITEMAP: 'cmd-SiteMap',
  ABOUT_SITE: 'cmd-AboutSite',
  METRICS: 'cmd-Metrics',
} as const;

export type Command = typeof COMMANDS[keyof typeof COMMANDS];
