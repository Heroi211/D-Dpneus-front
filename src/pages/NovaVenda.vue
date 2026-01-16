<template>
  <div class="row">
    <div class="col-12">
      <card>
        <template slot="header">
          <div class="d-flex justify-content-between align-items-center">
            <h4 class="card-title">Vendas Realizadas</h4>
            <button
              class="btn btn-primary btn-sm"
              type="button"
              style="min-width: 40px; height: 40px; border-radius: 50%; font-size: 24px; line-height: 1; padding: 0;"
              title="Lançar Nova Venda"
              @click="iniciarNovaVenda"
            >
              +
            </button>
          </div>
        </template>
        <div v-if="!mostrarFormulario">
          <base-table
            :data="vendas"
            :columns="columns"
            thead-classes="text-primary"
            @edit="editarVenda"
            @delete="deletarVenda"
          >
          </base-table>
        </div>
        <div v-else class="card-body">
          <form @submit.prevent="salvarVenda">
            <div class="row">
              <div class="col-md-4">
                <div class="form-group">
                  <label>Nome do Cliente *</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="venda.cliente"
                    placeholder="Nome do cliente"
                    required
                    :disabled="produtos.length > 0"
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-3">
                <div class="form-group">
                  <label>Carro *</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="venda.carro"
                    placeholder="Ex: Gol, Civic"
                    required
                    :disabled="produtos.length > 0"
                  />
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <label>Placa *</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="venda.placa"
                    placeholder="ABC-1234"
                    required
                    :disabled="produtos.length > 0"
                  />
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <label>Modelo *</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="venda.modelo"
                    placeholder="Ex: 1.6, 2.0"
                    required
                    :disabled="produtos.length > 0"
                  />
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <label>Ano *</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="venda.ano"
                    placeholder="2020"
                    required
                    :disabled="produtos.length > 0"
                  />
                </div>
              </div>
            </div>

            <hr style="margin: 20px 0;" />
            <h5>Produtos da Venda</h5>

            <div class="row" v-if="produtos.length > 0">
              <div class="col-12">
                <table class="table table-sm">
                  <thead>
                    <tr>
                      <th>Produto</th>
                      <th>Quantidade</th>
                      <th>Valor Unitário</th>
                      <th>Valor Total</th>
                      <th>Fotos</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(produto, index) in produtos" :key="index">
                      <td>{{ produto.produto }}</td>
                      <td>{{ produto.quantidade }}</td>
                      <td>{{ produto.valorUnitarioFormatado }}</td>
                      <td>{{ produto.valorTotalFormatado }}</td>
                      <td>
                        <div v-if="produto.fotos && produto.fotos.length > 0" style="display: flex; gap: 5px;">
                          <span
                            v-for="(foto, fotoIndex) in produto.fotos"
                            :key="fotoIndex"
                            class="badge badge-primary"
                            style="cursor: pointer;"
                            @click="visualizarFoto(foto)"
                          >
                            Foto {{ fotoIndex + 1 }}
                          </span>
                        </div>
                        <span v-else class="text-muted">Sem fotos</span>
                      </td>
                      <td>
                        <button
                          type="button"
                          class="btn btn-sm btn-danger"
                          @click="removerProduto(index)"
                        >
                          Remover
                        </button>
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colspan="3" class="text-right"><strong>Total Geral:</strong></td>
                      <td><strong>{{ totalGeralFormatado }}</strong></td>
                      <td colspan="2"></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            <hr style="margin: 20px 0;" />
            <h5>Adicionar Produto</h5>

            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label>Produto *</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="produtoAtual.produto"
                    placeholder="Nome do produto"
                    required
                  />
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <label>Quantidade *</label>
                  <input
                    type="number"
                    class="form-control"
                    v-model.number="produtoAtual.quantidade"
                    placeholder="0"
                    min="1"
                    required
                  />
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <label>Valor Unitário *</label>
                  <input
                    type="number"
                    step="0.01"
                    class="form-control"
                    v-model.number="produtoAtual.valorUnitario"
                    placeholder="0.00"
                    min="0"
                    required
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label>Fotos do Produto (máximo 3)</label>
                  <input
                    type="file"
                    class="form-control"
                    multiple
                    accept="image/*"
                    @change="handleFileSelect"
                    ref="fileInput"
                  />
                  <small class="form-text text-muted">Selecione até 3 fotos</small>
                  <div v-if="produtoAtual.fotos && produtoAtual.fotos.length > 0" style="margin-top: 10px;">
                    <div v-for="(foto, index) in produtoAtual.fotos" :key="index" style="display: inline-block; margin-right: 10px; margin-top: 10px;">
                      <img
                        :src="foto"
                        alt="Preview"
                        style="width: 80px; height: 80px; object-fit: cover; border-radius: 4px; border: 1px solid #ddd;"
                      />
                      <button
                        type="button"
                        class="btn btn-sm btn-danger"
                        style="display: block; width: 100%; margin-top: 5px;"
                        @click="removerFoto(index)"
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <button
                  type="button"
                  class="btn btn-success"
                  @click="adicionarProduto"
                  :disabled="!produtoAtual.produto || !produtoAtual.quantidade || !produtoAtual.valorUnitario"
                >
                  Adicionar Produto
                </button>
              </div>
            </div>

            <hr style="margin: 30px 0;" />

            <div class="row">
              <div class="col-md-12">
                <button
                  type="submit"
                  class="btn btn-primary"
                  :disabled="produtos.length === 0"
                >
                  Salvar Venda
                </button>
                <button type="button" class="btn btn-default" @click="cancelar">
                  Cancelar
                </button>
              </div>
            </div>
          </form>
        </div>
      </card>
    </div>
  </div>
</template>

<script>
import { BaseTable } from "@/components";

export default {
  name: "NovaVenda",
  components: {
    BaseTable,
  },
  data() {
    return {
      columns: ["Cliente", "Produtos", "Total", "Data", "Ações"],
      vendas: [
        {
          id: 1,
          cliente: "João Silva",
          produtos: "Pneu Aro 14, Óleo Motor",
          total: "R$ 1.090,00",
          data: "15/01/2024",
        },
        {
          id: 2,
          cliente: "Maria Santos",
          produtos: "Pneu Aro 15",
          total: "R$ 700,00",
          data: "16/01/2024",
        },
      ],
      mostrarFormulario: false,
      vendaIndex: null,
      venda: {
        cliente: "",
        carro: "",
        placa: "",
        modelo: "",
        ano: "",
      },
      produtos: [],
      produtoAtual: {
        produto: "",
        quantidade: 1,
        valorUnitario: "",
        fotos: [],
      },
    };
  },
  computed: {
    totalGeralFormatado() {
      const total = this.produtos.reduce((sum, p) => {
        return sum + (parseFloat(p.quantidade) * parseFloat(p.valorUnitario));
      }, 0);
      return `R$ ${total.toFixed(2).replace(".", ",")}`;
    },
  },
  methods: {
    handleFileSelect(event) {
      const files = event.target.files;
      const fotosSelecionadas = Array.from(files).slice(0, 3 - this.produtoAtual.fotos.length);
      
      fotosSelecionadas.forEach((file) => {
        if (this.produtoAtual.fotos.length < 3) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.produtoAtual.fotos.push(e.target.result);
          };
          reader.readAsDataURL(file);
        }
      });

      if (files.length > 3 - this.produtoAtual.fotos.length) {
        alert("Você só pode adicionar até 3 fotos por produto!");
      }
    },
    removerFoto(index) {
      this.produtoAtual.fotos.splice(index, 1);
      if (this.$refs.fileInput) {
        this.$refs.fileInput.value = "";
      }
    },
    adicionarProduto() {
      if (!this.produtoAtual.produto || !this.produtoAtual.quantidade || !this.produtoAtual.valorUnitario) {
        alert("Preencha todos os campos obrigatórios do produto!");
        return;
      }

      const produto = {
        produto: this.produtoAtual.produto,
        quantidade: this.produtoAtual.quantidade,
        valorUnitario: parseFloat(this.produtoAtual.valorUnitario),
        valorUnitarioFormatado: `R$ ${parseFloat(this.produtoAtual.valorUnitario).toFixed(2).replace(".", ",")}`,
        valorTotal: this.produtoAtual.quantidade * parseFloat(this.produtoAtual.valorUnitario),
        valorTotalFormatado: `R$ ${(this.produtoAtual.quantidade * parseFloat(this.produtoAtual.valorUnitario)).toFixed(2).replace(".", ",")}`,
        fotos: [...this.produtoAtual.fotos],
      };

      this.produtos.push(produto);
      this.limparProdutoAtual();
    },
    removerProduto(index) {
      this.produtos.splice(index, 1);
    },
    limparProdutoAtual() {
      this.produtoAtual = {
        produto: "",
        quantidade: 1,
        valorUnitario: "",
        fotos: [],
      };
      if (this.$refs.fileInput) {
        this.$refs.fileInput.value = "";
      }
    },
    iniciarNovaVenda() {
      this.venda = {
        cliente: "",
        carro: "",
        placa: "",
        modelo: "",
        ano: "",
      };
      this.produtos = [];
      this.limparProdutoAtual();
      this.mostrarFormulario = true;
      this.vendaIndex = null;
    },
    salvarVenda() {
      if (!this.venda.cliente) {
        alert("Informe o nome do cliente!");
        return;
      }

      if (this.produtos.length === 0) {
        alert("Adicione pelo menos um produto à venda!");
        return;
      }

      const dataAtual = new Date().toLocaleDateString("pt-BR");
      const produtosDescricao = this.produtos.map(p => p.produto).join(", ");
      const totalGeral = this.produtos.reduce((sum, p) => sum + p.valorTotal, 0);

      const novaVenda = {
        id: this.vendas.length + 1,
        cliente: this.venda.cliente,
        carro: this.venda.carro,
        placa: this.venda.placa,
        modelo: this.venda.modelo,
        ano: this.venda.ano,
        produtos: produtosDescricao,
        produtosDetalhes: JSON.parse(JSON.stringify(this.produtos)),
        total: `R$ ${totalGeral.toFixed(2).replace(".", ",")}`,
        data: dataAtual,
      };

      this.vendas.push(novaVenda);
      alert("Venda salva com sucesso!");
      this.cancelar();
    },
    cancelar() {
      this.venda = {
        cliente: "",
        carro: "",
        placa: "",
        modelo: "",
        ano: "",
      };
      this.produtos = [];
      this.limparProdutoAtual();
      this.mostrarFormulario = false;
      this.vendaIndex = null;
    },
    editarVenda(venda, index) {
      // Para edição, você pode implementar depois se necessário
      alert("Edição de venda será implementada em breve");
    },
    deletarVenda(venda, index) {
      if (confirm(`Tem certeza que deseja deletar a venda do cliente ${venda.cliente}?`)) {
        this.vendas.splice(index, 1);
        alert("Venda deletada com sucesso!");
      }
    },
    visualizarFoto(foto) {
      // Abre a foto em uma nova janela
      const newWindow = window.open();
      newWindow.document.write(`<img src="${foto}" style="max-width: 100%; height: auto;" />`);
    },
  },
};
</script>

<style scoped>
.form-group {
  margin-bottom: 20px;
}

label {
  font-weight: 600;
  color: #333;
}

.btn {
  margin-right: 10px;
}
</style>
