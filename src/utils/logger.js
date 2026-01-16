// Helper para verificar se debug está habilitado (calcula dinamicamente)
const isDebugEnabled = () => {
  const debugValue = process.env.VUE_APP_DEBUG;
  // Se não estiver definido, assume true (modo debug padrão)
  // Se for "false" (string), desabilita
  // Qualquer outro valor (incluindo "true") habilita
  return debugValue === undefined || debugValue !== "false";
};

// Função para log condicional
export const log = (...args) => {
  if (isDebugEnabled()) {
    console.log(...args);
  }
};

// Função para error condicional
export const error = (...args) => {
  if (isDebugEnabled()) {
    console.error(...args);
  }
};

// Função para warn condicional
export const warn = (...args) => {
  if (isDebugEnabled()) {
    console.warn(...args);
  }
};

// Função para info condicional
export const info = (...args) => {
  if (isDebugEnabled()) {
    console.info(...args);
  }
};

// Função para debug condicional
export const debug = (...args) => {
  if (isDebugEnabled()) {
    console.debug(...args);
  }
};

// Exporta um objeto com todas as funções para facilitar uso
export default {
  log,
  error,
  warn,
  info,
  debug,
};
