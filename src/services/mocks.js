// Dados mockados para ambiente local

export const mockClientes = [
  {
    id: 1,
    nome: "João",
    sobrenome: "Silva",
    telefone: "(11) 98765-4321",
    bairro: "Centro",
    cpf: "123.456.789-00",
    ativo: true,
  },
  {
    id: 2,
    nome: "Maria",
    sobrenome: "Santos",
    telefone: "(11) 91234-5678",
    bairro: "Jardim Paulista",
    cpf: "987.654.321-00",
    ativo: true,
  },
  {
    id: 3,
    nome: "Pedro",
    sobrenome: "Oliveira",
    telefone: "(11) 92345-6789",
    bairro: "Vila Madalena",
    cpf: "456.789.123-00",
    ativo: true,
  },
];

export const mockProdutos = [
  {
    id: 1,
    nome: "Pneu Aro 14",
    categoria: "Pneus",
    valorcompra: "R$ 180,00",
    valorvenda: "R$ 250,00",
    quantidade: 50,
    marca: "Michelin",
    observacao: "Pneu novo, linha de verão",
    ativo: true,
  },
  {
    id: 2,
    nome: "Óleo Motor 5W30",
    categoria: "Lubrificantes",
    valorcompra: "R$ 25,00",
    valorvenda: "R$ 45,00",
    quantidade: 100,
    marca: "Shell",
    observacao: "Óleo sintético",
    ativo: true,
  },
  {
    id: 3,
    nome: "Filtro de Ar",
    categoria: "Filtros",
    valorcompra: "R$ 18,00",
    valorvenda: "R$ 35,00",
    quantidade: 75,
    marca: "Fram",
    observacao: "Filtro de alta performance",
    ativo: true,
  },
  {
    id: 4,
    nome: "Pneu Aro 15",
    categoria: "Pneus",
    valorcompra: "R$ 250,00",
    valorvenda: "R$ 350,00",
    quantidade: 30,
    marca: "Bridgestone",
    observacao: "Pneu all-season",
    ativo: true,
  },
];

export const mockFornecedores = [
  {
    id: 1,
    cnpj: "12.345.678/0001-90",
    nome: "Michelin Brasil Ltda",
    tipo: "Fabricante",
    ativo: true,
  },
  {
    id: 2,
    nome: "Shell Brasil S.A.",
    cnpj: "98.765.432/0001-10",
    tipo: "Fabricante",
    ativo: true,
  },
  {
    id: 3,
    cnpj: "11.222.333/0001-44",
    nome: "Distribuidora de Pneus São Paulo",
    tipo: "Distribuidor",
    ativo: true,
  },
];

export const mockCategorias = [
  {
    id: 1,
    nome: "Pneus",
    ativo: true,
  },
  {
    id: 2,
    nome: "Lubrificantes",
    ativo: true,
  },
  {
    id: 3,
    nome: "Filtros",
    ativo: true,
  },
  {
    id: 4,
    nome: "Acessórios",
    ativo: true,
  },
  {
    id: 5,
    nome: "Baterias",
    ativo: true,
  },
];

export const mockTarefas = [
  {
    id: 1,
    titulo: "Atualizar estoque de pneus",
    descricao: "Verificar quantidade de pneus aro 14 em estoque",
    concluida: false,
    ativo: true,
  },
  {
    id: 2,
    titulo: "Fazer pedido de óleo",
    descricao: "Solicitar 50 unidades de óleo 5W30",
    concluida: true,
    ativo: true,
  },
  {
    id: 3,
    titulo: "Contatar novo fornecedor",
    descricao: "Negociar preços com fornecedor de filtros",
    concluida: false,
    ativo: true,
  },
  {
    id: 4,
    titulo: "Organizar prateleiras",
    descricao: "Reorganizar produtos na área de exposição",
    concluida: false,
    ativo: true,
  },
];
