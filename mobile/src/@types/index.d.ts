declare module "*.png";
declare module "*.jpg";

declare type LinkProps = {
  link: string,
}

declare type LanguageScanProps = {
  loading: string,
  result: string,
  access: string,
  share: string,
  again: string,
  leave: string,
}

declare type LanguageToolsProps = {
  tools: string,
  recently: string,
  scan: string,
  qr: string,
  about: string,
  settings: string,
  clean: string,
  empty: string,
}

declare type LanguageAboutProps = {
  title: string,
  articles: Array<ArticleDataProps>,
}

declare type ArticleDataProps = {
  title: string,
  author: string,
  article: Array<ArticleProps>,
}

declare type ArticleProps = {
  title: string,
  paragraph_1: string,
  paragraph_2: string,
  paragraph_3: string,
  paragraph_4: string,
  reference: string,
}

declare type LanguageSettingsProps = {
  language: string,
  theme: string,
  support: string,
  repository: string,
  version: string,
  english: string,
  portuguese: string,
  light: string,
  dark: string,
  idea: string,
  bug: string,
  contact: string,
  send: string,
}

declare type LanguageCreateProps = {
  create: string,
  text: string,
  text_2: string,
  generate: string,
  download: string,
  share: string,
  comingSoon: string,
}
