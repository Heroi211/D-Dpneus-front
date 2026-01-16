<template>
  <div class="row">
    <div class="col-12">
      <card>
        <template slot="header">
          <div class="d-flex justify-content-between align-items-center">
            <h4 class="card-title">Cadastro de Fornecedores</h4>
            <button
              class="btn btn-primary btn-sm"
              type="button"
              style="min-width: 40px; height: 40px; border-radius: 50%; font-size: 24px; line-height: 1; padding: 0;"
              title="Adicionar Fornecedor"
              @click="mostrarFormulario = true"
            >
              +
            </button>
          </div>
        </template>
        <div v-if="!mostrarFormulario">
          <base-table
            :data="fornecedores"
            :columns="columns"
            thead-classes="text-primary"
          >
          </base-table>
        </div>
        <div v-else class="card-body">
          <form @submit.prevent="salvarFornecedor">
            <div class="row">
              <div class="col-md-4">
                <div class="form-group">
                  <label>CNPJ *</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="fornecedor.cnpj"
                    placeholder="00.000.000/0000-00"
                    required
                  />
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                  <label>Nome *</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="fornecedor.nome"
                    placeholder="Digite o nome do fornecedor"
                    required
                  />
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                  <label>Tipo *</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="fornecedor.tipo"
                    placeholder="Digite o tipo"
                    required
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
                      v-model="fornecedor.ativo"
                      style="margin-right: 8px;"
                    />
                    Ativo
                  </label>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <button type="submit" class="btn btn-primary">Salvar Fornecedor</button>
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
  name: "CadastroFornecedores",
  components: {
    BaseTable,
  },
  data() {
    return {
      columns: ["CNPJ", "Nome", "Tipo", "Ativo"],
      fornecedores: [],
      mostrarFormulario: false,
      fornecedor: {
        cnpj: "",
        nome: "",
        tipo: "",
        ativo: true,
      },
    };
  },
  methods: {
    salvarFornecedor() {
      const novoFornecedor = {
        id: this.fornecedores.length + 1,
        cnpj: this.fornecedor.cnpj,
        nome: this.fornecedor.nome,
        tipo: this.fornecedor.tipo,
        ativo: this.fornecedor.ativo,
      };
      this.fornecedores.push(novoFornecedor);
      this.limparFormulario();
      this.mostrarFormulario = false;
      alert("Fornecedor salvo com sucesso!");
    },
    limparFormulario() {
      this.fornecedor = {
        cnpj: "",
        nome: "",
        tipo: "",
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
