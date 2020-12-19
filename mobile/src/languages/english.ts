import { articles as articlesData } from '../services/articles';

export const tools: LanguageToolsProps = {
  tools: 'Tools',
  recently: 'Recently Opened',
  scan: 'Scan QR Code',
  qr: 'Create QR Code',
  about: 'About',
  settings: 'Settings',
  clean: 'Clean All',
  empty: 'Has no link available :(',
};

export const scan: LanguageScanProps = {
  loading: 'Loading...',
  result: 'Result',
  access: 'Access',
  share: 'Share',
  again: 'Scan Again',
  leave: 'Leave',
};

export const about: LanguageAboutProps = {
  title: 'Learn about QR Code',
  articles: articlesData.map(article => article),
};

export const settings: LanguageSettingsProps = {
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

export const create: LanguageCreateProps = {
  create: 'Create QR',
  text: 'Type a text',
  new: 'New',
  about_1: `Find out what a QR code is on the 'About' page.`,
  about_2: 'I hope you like the articles chosen :)',
  generate: 'Generate',
  download: 'Download',
  share: 'Share',
  comingSoon: 'Coming soon ...',
}
