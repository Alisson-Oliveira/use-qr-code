import { articles as articlesData } from '../services/articles';

export const tools = {
  tools: 'Tools',
  recently: 'Recently Opened',
  scan: 'Scan QR Code',
  qr: 'Create QR Code',
  about: 'About',
  settings: 'Settings',
  clean: 'Clean All',
  empty: 'Has no link available :(',
};

export const scan = {
  loading: 'Loading...',
  result: 'Result',
  access: 'Access',
  share: 'Share',
  again: 'Scan Again',
  leave: 'Leave',
};

export const about = {
  title: 'Learn about QR Code',
  by: 'By',
  articles: articlesData.map(article => article),
};

export const settings = {
  language: 'Language',
  theme: 'Theme',
  support: 'Support',
  repository: 'Repository',
  version: 'Version',
  english: 'English',
  portuguese: 'Portuguese',
  light: 'Light',
  dark: 'Dark',
  idea: 'Idea to add to the app?',
  bug: 'Any bug?',
  contact: 'Please, contact me :)',
  send: 'Send',
};

export const create = {
  create: 'Create QR',
  text: 'Type a text',
  generate: 'Generate',
  download: 'Download',
  share: 'Share',
  comingSoon: 'Coming soon ...',
}
