<template>
  <div class="row">
    <div class="col-12">
      <card>
        <template slot="header">
          <div class="d-flex justify-content-between align-items-center">
            <h4 class="card-title">Cadastro de Cliente</h4>
            <button
              class="btn btn-primary btn-sm"
              type="button"
              style="min-width: 40px; height: 40px; border-radius: 50%; font-size: 24px; line-height: 1; padding: 0;"
              title="Adicionar Cliente"
              @click="mostrarFormulario = true"
            >
              +
            </button>
          </div>
        </template>
        <div v-if="!mostrarFormulario">
          <base-table
            :data="clientes"
            :columns="columns"
            thead-classes="text-primary"
          >
          </base-table>
        </div>
        <div v-else class="card-body">
          <form @submit.prevent="salvarCliente">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label>Nome *</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="cliente.nome"
                    placeholder="Digite o nome"
                    required
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label>Sobrenome *</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="cliente.sobrenome"
                    placeholder="Digite o sobrenome"
                    required
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label>Telefone *</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="cliente.telefone"
                    placeholder="(00) 00000-0000"
                    required
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label>Bairro *</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="cliente.bairro"
                    placeholder="Digite o bairro"
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
                        v-model="cliente.ativo"
                        style="margin-right: 8px;"
                      />
                      Ativo
                    </label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <button type="submit" class="btn btn-primary">Salvar Cliente</button>
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
  name: "CadastroCliente",
  components: {
    BaseTable,
  },
  data() {
    return {
      columns: ["Nome", "Sobrenome", "Telefone", "Bairro", "Ativo"],
      clientes: [],
      mostrarFormulario: false,
      cliente: {
        nome: "",
        sobrenome: "",
        telefone: "",
        bairro: "",
        ativo: true,
      },
    };
  },
  methods: {
    salvarCliente() {
      const novoCliente = {
        id: this.clientes.length + 1,
        nome: this.cliente.nome,
        sobrenome: this.cliente.sobrenome,
        telefone: this.cliente.telefone,
        bairro: this.cliente.bairro,
        ativo: this.cliente.ativo,
      };
      this.clientes.push(novoCliente);
      this.limparFormulario();
      this.mostrarFormulario = false;
      alert("Cliente salvo com sucesso!");
    },
    limparFormulario() {
      this.cliente = {
        nome: "",
        sobrenome: "",
        telefone: "",
        bairro: "",
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
