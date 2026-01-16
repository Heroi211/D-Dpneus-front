<template>
  <div class="row">
    <div class="col-12">
      <card>
        <template slot="header">
          <div class="d-flex justify-content-between align-items-center">
            <h4 class="card-title">Cadastro de Produtos</h4>
            <button
              class="btn btn-primary btn-sm"
              type="button"
              style="min-width: 40px; height: 40px; border-radius: 50%; font-size: 24px; line-height: 1; padding: 0;"
              title="Adicionar Produto"
              @click="mostrarFormulario = true"
            >
              +
            </button>
          </div>
        </template>
        <div v-if="!mostrarFormulario">
          <base-table
            :data="produtos"
            :columns="columns"
            thead-classes="text-primary"
          >
          </base-table>
        </div>
        <div v-else class="card-body">
          <form @submit.prevent="salvarEstoque">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label>Nome *</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="estoque.nome"
                    placeholder="Digite o nome do produto"
                    required
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label>Categoria *</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="estoque.categoria"
                    placeholder="Digite a categoria"
                    required
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4">
                <div class="form-group">
                  <label>Valor de Compra *</label>
                  <input
                    type="number"
                    step="0.01"
                    class="form-control"
                    v-model="estoque.valorCompra"
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                  <label>Valor de Venda *</label>
                  <input
                    type="number"
                    step="0.01"
                    class="form-control"
                    v-model="estoque.valorVenda"
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                  <label>Quantidade *</label>
                  <input
                    type="number"
                    class="form-control"
                    v-model="estoque.quantidade"
                    placeholder="0"
                    required
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label>Marca *</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="estoque.marca"
                    placeholder="Digite a marca"
                    required
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label>Observação</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="estoque.observacao"
                    placeholder="Observações adicionais"
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label>
                    <input
                      type="checkbox"
                      v-model="estoque.ativo"
                      style="margin-right: 8px;"
                    />
                    Ativo
                  </label>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <button type="submit" class="btn btn-primary">Salvar Produto</button>
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
  name: "CadastroEstoque",
  components: {
    BaseTable,
  },
  data() {
    return {
      columns: ["Nome", "Categoria", "ValorCompra", "ValorVenda", "Quantidade", "Marca", "Observacao", "Ativo"],
      produtos: [],
      mostrarFormulario: false,
      estoque: {
        nome: "",
        categoria: "",
        valorCompra: "",
        valorVenda: "",
        quantidade: "",
        marca: "",
        observacao: "",
        ativo: true,
      },
    };
  },
  methods: {
    salvarEstoque() {
      const novoProduto = {
        id: this.produtos.length + 1,
        nome: this.estoque.nome,
        categoria: this.estoque.categoria,
        valorcompra: this.estoque.valorCompra,
        valorvenda: this.estoque.valorVenda,
        quantidade: this.estoque.quantidade,
        marca: this.estoque.marca,
        observacao: this.estoque.observacao,
        ativo: this.estoque.ativo,
      };
      this.produtos.push(novoProduto);
      this.limparFormulario();
      this.mostrarFormulario = false;
      alert("Produto salvo com sucesso!");
    },
    limparFormulario() {
      this.estoque = {
        nome: "",
        categoria: "",
        valorCompra: "",
        valorVenda: "",
        quantidade: "",
        marca: "",
        observacao: "",
        ativo: true,
      };
    },
    cancelar() {
      this.limparFormulario();
      this.mostrarFormulario = false;
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
