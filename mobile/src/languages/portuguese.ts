import { articles as articlesData } from '../services/articles';

export const tools = {
  tools: 'Ferramentas',
  recently: 'Aberto Recentemente',
  scan: 'Escanear QR Code',
  qr: 'Criar QR Code',
  about: 'Sobre',
  settings: 'Configurações',
  clean: 'Limpar Tudo',
  empty: 'Não tem link disponível :(',
};

export const scan = {
  loading: 'Carregando...',
  result: 'Resultado',
  access: 'Acessar',
  share: 'Compartilhar',
  again: 'Escanear Novamente',
  leave: 'Sair',
};

export const about = {
  title: 'Aprenda sobre QR Code',
  by: 'Por',
  articles: articlesData.map(article => article),
};

export const settings = {
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

export const create = {
  create: 'Criar QR',
  text: 'Escreva um texto',
  text_2: 'Adicionar uma logo (opcional)',
  edit: 'Editar',
  generate: 'Gerar',
  download: 'Baixar',
  share: 'Compartilhar',
  comingSoon: 'Em Breve ...',
}
