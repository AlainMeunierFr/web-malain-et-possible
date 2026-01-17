export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  SITEMAP: '/sitemap',
  ABOUT_SITE: '/about-site',
} as const;

export type Route = typeof ROUTES[keyof typeof ROUTES];

export const COMMANDS = {
  EMAIL: 'cmd-email',
  YOUTUBE: 'cmd-YouTube',
  LINKEDIN: 'cmd-Linkedin',
  SITEMAP: 'cmd-SiteMap',
  ABOUT_SITE: 'cmd-AboutSite',
} as const;

export type Command = typeof COMMANDS[keyof typeof COMMANDS];
