const API_BASE_URL = process.env.VUE_APP_API_URL || "http://localhost:3000/api";
const isLocalEnvironment = process.env.VUE_APP_ENVIRONMENT === "local";

// Helper para verificar se deve usar mocks
export const useMocks = () => {
  return isLocalEnvironment;
};

// Função auxiliar para fazer requisições HTTP (sem axios por enquanto)
const fetchApi = async (url, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

// API de Clientes
export const clientesApi = {
  getAll: async () => {
    if (useMocks()) return null; // Retorna null para usar mocks
    return fetchApi("/clientes");
  },
  create: async (cliente) => {
    if (useMocks()) return null;
    return fetchApi("/clientes", {
      method: "POST",
      body: JSON.stringify(cliente),
    });
  },
  update: async (id, cliente) => {
    if (useMocks()) return null;
    return fetchApi(`/clientes/${id}`, {
      method: "PUT",
      body: JSON.stringify(cliente),
    });
  },
  delete: async (id) => {
    if (useMocks()) return null;
    return fetchApi(`/clientes/${id}`, {
      method: "DELETE",
    });
  },
};

// API de Produtos
export const produtosApi = {
  getAll: async () => {
    if (useMocks()) return null;
    return fetchApi("/produtos");
  },
  create: async (produto) => {
    if (useMocks()) return null;
    return fetchApi("/produtos", {
      method: "POST",
      body: JSON.stringify(produto),
    });
  },
  update: async (id, produto) => {
    if (useMocks()) return null;
    return fetchApi(`/produtos/${id}`, {
      method: "PUT",
      body: JSON.stringify(produto),
    });
  },
  delete: async (id) => {
    if (useMocks()) return null;
    return fetchApi(`/produtos/${id}`, {
      method: "DELETE",
    });
  },
};

// API de Fornecedores
export const fornecedoresApi = {
  getAll: async () => {
    if (useMocks()) return null;
    return fetchApi("/fornecedores");
  },
  create: async (fornecedor) => {
    if (useMocks()) return null;
    return fetchApi("/fornecedores", {
      method: "POST",
      body: JSON.stringify(fornecedor),
    });
  },
  update: async (id, fornecedor) => {
    if (useMocks()) return null;
    return fetchApi(`/fornecedores/${id}`, {
      method: "PUT",
      body: JSON.stringify(fornecedor),
    });
  },
  delete: async (id) => {
    if (useMocks()) return null;
    return fetchApi(`/fornecedores/${id}`, {
      method: "DELETE",
    });
  },
};

// API de Categorias
export const categoriasApi = {
  getAll: async () => {
    if (useMocks()) return null;
    return fetchApi("/categorias");
  },
  create: async (categoria) => {
    if (useMocks()) return null;
    return fetchApi("/categorias", {
      method: "POST",
      body: JSON.stringify(categoria),
    });
  },
  update: async (id, categoria) => {
    if (useMocks()) return null;
    return fetchApi(`/categorias/${id}`, {
      method: "PUT",
      body: JSON.stringify(categoria),
    });
  },
  delete: async (id) => {
    if (useMocks()) return null;
    return fetchApi(`/categorias/${id}`, {
      method: "DELETE",
    });
  },
};

// API de Tarefas
export const tarefasApi = {
  getAll: async () => {
    if (useMocks()) return null;
    return fetchApi("/tarefas");
  },
  create: async (tarefa) => {
    if (useMocks()) return null;
    return fetchApi("/tarefas", {
      method: "POST",
      body: JSON.stringify(tarefa),
    });
  },
  update: async (id, tarefa) => {
    if (useMocks()) return null;
    return fetchApi(`/tarefas/${id}`, {
      method: "PUT",
      body: JSON.stringify(tarefa),
    });
  },
  delete: async (id) => {
    if (useMocks()) return null;
    return fetchApi(`/tarefas/${id}`, {
      method: "DELETE",
    });
  },
};

// API de Vendas
export const vendasApi = {
  getAll: async () => {
    if (useMocks()) return null;
    return fetchApi("/vendas");
  },
  create: async (venda) => {
    if (useMocks()) return null;
    return fetchApi("/vendas", {
      method: "POST",
      body: JSON.stringify(venda),
    });
  },
  update: async (id, venda) => {
    if (useMocks()) return null;
    return fetchApi(`/vendas/${id}`, {
      method: "PUT",
      body: JSON.stringify(venda),
    });
  },
  delete: async (id) => {
    if (useMocks()) return null;
    return fetchApi(`/vendas/${id}`, {
      method: "DELETE",
    });
  },
};
