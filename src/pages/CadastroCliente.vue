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
            @edit="editarCliente"
            @delete="deletarCliente"
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
              <div class="col-md-4">
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
              <div class="col-md-4">
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
              <div class="col-md-4">
                <div class="form-group">
                  <label>CPF *</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="cliente.cpf"
                    placeholder="000.000.000-00"
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
import { clientesApi, useMocks } from "@/services/api";
import { mockClientes } from "@/services/mocks";
import logger from "@/utils/logger";

export default {
  name: "CadastroCliente",
  components: {
    BaseTable,
  },
  data() {
    return {
      columns: ["Nome", "Sobrenome", "Telefone", "Bairro", "CPF", "Ativo", "Ações"],
      clientes: [],
      mostrarFormulario: false,
      clienteIndex: null,
      cliente: {
        nome: "",
        sobrenome: "",
        telefone: "",
        bairro: "",
        cpf: "",
        ativo: true,
      },
    };
  },
  methods: {
    async salvarCliente() {
      if (this.clienteIndex !== null) {
        // Editar cliente existente
        if (useMocks()) {
          this.clientes[this.clienteIndex] = {
            ...this.cliente,
            id: this.clientes[this.clienteIndex].id,
          };
          alert("Cliente atualizado com sucesso!");
        } else {
          try {
            await clientesApi.update(this.clientes[this.clienteIndex].id, this.cliente);
            await this.carregarClientes();
            alert("Cliente atualizado com sucesso!");
          } catch (error) {
            alert("Erro ao atualizar cliente: " + error.message);
            return;
          }
        }
      } else {
        // Adicionar novo cliente
        if (useMocks()) {
          const novoCliente = {
            id: this.clientes.length + 1,
            nome: this.cliente.nome,
            sobrenome: this.cliente.sobrenome,
            telefone: this.cliente.telefone,
            bairro: this.cliente.bairro,
            cpf: this.cliente.cpf,
            ativo: this.cliente.ativo,
          };
          this.clientes.push(novoCliente);
          alert("Cliente salvo com sucesso!");
        } else {
          try {
            await clientesApi.create(this.cliente);
            await this.carregarClientes();
            alert("Cliente salvo com sucesso!");
          } catch (error) {
            alert("Erro ao salvar cliente: " + error.message);
            return;
          }
        }
      }
      this.limparFormulario();
      this.mostrarFormulario = false;
      this.clienteIndex = null;
    },
    async carregarClientes() {
      if (useMocks()) {
        this.clientes = [...mockClientes];
      } else {
        try {
          const dados = await clientesApi.getAll();
          this.clientes = dados || [];
        } catch (error) {
          logger.error("Erro ao carregar clientes:", error);
          alert("Erro ao carregar clientes do servidor");
        }
      }
    },
    limparFormulario() {
      this.cliente = {
        nome: "",
        sobrenome: "",
        telefone: "",
        bairro: "",
        cpf: "",
        ativo: true,
      };
      this.clienteIndex = null;
    },
    cancelar() {
      this.limparFormulario();
      this.mostrarFormulario = false;
    },
    editarCliente(cliente, index) {
      this.cliente = { ...cliente };
      this.mostrarFormulario = true;
      this.clienteIndex = index;
    },
    async deletarCliente(cliente, index) {
      if (confirm(`Tem certeza que deseja deletar o cliente ${cliente.nome} ${cliente.sobrenome}?`)) {
        if (useMocks()) {
          this.clientes.splice(index, 1);
          alert("Cliente deletado com sucesso!");
        } else {
          try {
            await clientesApi.delete(cliente.id);
            await this.carregarClientes();
            alert("Cliente deletado com sucesso!");
          } catch (error) {
            alert("Erro ao deletar cliente: " + error.message);
          }
        }
      }
    },
  },
  async mounted() {
    await this.carregarClientes();
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
