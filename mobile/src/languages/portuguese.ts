import { articles as articlesData } from '../services/articles';

export const tools: LanguageToolsProps = {
  tools: 'Ferramentas',
  recently: 'Aberto Recentemente',
  scan: 'Escanear QR Code',
  qr: 'Criar QR Code',
  about: 'Sobre',
  settings: 'Configurações',
  clean: 'Limpar Tudo',
  empty: 'Não tem link disponível :(',
};

export const scan: LanguageScanProps = {
  loading: 'Carregando...',
  result: 'Resultado',
  access: 'Acessar',
  share: 'Compartilhar',
  again: 'Escanear Novamente',
  leave: 'Sair',
};

export const about: LanguageAboutProps = {
  title: 'Aprenda sobre QR Code',
  articles: articlesData.map(article => article),
};

export const settings: LanguageSettingsProps = {
  language: 'Linguagem',
  theme: 'Tema',
  support: 'Suporte',
  repository: 'Repositório',
  version: 'Versão',
  english: 'Inglês',
  portuguese: 'Português',
  light: 'Claro',
  dark: 'Escuro',
  idea: 'Ideia para adicinar ao app?',
  bug: 'Algum erro?',
  contact: 'Por favor, contate-me :)',
  send: 'Enviar',
};

export const create: LanguageCreateProps = {
  create: 'Criar QR',
  text: 'Escreva um texto',
  new: 'Novo',
  about_1: `Descubra o que é um código QR na página 'Sobre'.`,
  about_2: 'Espero que gostem dos artigos escolhidos :)',
  generate: 'Gerar',
  download: 'Baixar',
  share: 'Compartilhar',
  comingSoon: 'Em Breve ...',
}
