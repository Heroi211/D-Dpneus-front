<template>
  <div class="row">
    <div class="col-12">
      <card>
        <template slot="header">
          <div class="d-flex justify-content-between align-items-center">
            <h4 class="card-title">Cadastro de Tarefas</h4>
            <button
              class="btn btn-primary btn-sm"
              type="button"
              style="min-width: 40px; height: 40px; border-radius: 50%; font-size: 24px; line-height: 1; padding: 0;"
              title="Adicionar Tarefa"
              @click="mostrarFormulario = true"
            >
              +
            </button>
          </div>
        </template>
        <div v-if="!mostrarFormulario">
          <base-table
            :data="tarefas"
            :columns="columns"
            thead-classes="text-primary"
            @edit="editarTarefa"
            @delete="deletarTarefa"
          >
          </base-table>
        </div>
        <div v-else class="card-body">
          <form @submit.prevent="salvarTarefa">
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label>Título *</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="tarefa.titulo"
                    placeholder="Digite o título da tarefa"
                    required
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label>Descrição</label>
                  <textarea
                    class="form-control"
                    rows="3"
                    v-model="tarefa.descricao"
                    placeholder="Digite a descrição da tarefa"
                  ></textarea>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label>
                    <input
                      type="checkbox"
                      v-model="tarefa.concluida"
                      style="margin-right: 8px;"
                    />
                    Concluída
                  </label>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label>
                    <input
                      type="checkbox"
                      v-model="tarefa.ativo"
                      style="margin-right: 8px;"
                    />
                    Ativo
                  </label>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <button type="submit" class="btn btn-primary">Salvar Tarefa</button>
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
import { tarefasApi, useMocks } from "@/services/api";
import { mockTarefas } from "@/services/mocks";
import logger from "@/utils/logger";

export default {
  name: "CadastroTarefas",
  components: {
    BaseTable,
  },
  data() {
    return {
      columns: ["Titulo", "Descricao", "Concluida", "Ativo", "Ações"],
      tarefas: [],
      mostrarFormulario: false,
      tarefaIndex: null,
      tarefa: {
        titulo: "",
        descricao: "",
        concluida: false,
        ativo: true,
      },
    };
  },
  methods: {
    async salvarTarefa() {
      if (this.tarefaIndex !== null) {
        // Editar tarefa existente
        if (useMocks()) {
          this.tarefas[this.tarefaIndex] = {
            ...this.tarefa,
            id: this.tarefas[this.tarefaIndex].id,
          };
          alert("Tarefa atualizada com sucesso!");
        } else {
          try {
            await tarefasApi.update(this.tarefas[this.tarefaIndex].id, this.tarefa);
            await this.carregarTarefas();
            alert("Tarefa atualizada com sucesso!");
          } catch (error) {
            alert("Erro ao atualizar tarefa: " + error.message);
            return;
          }
        }
      } else {
        // Adicionar nova tarefa
        if (useMocks()) {
          const novaTarefa = {
            id: this.tarefas.length + 1,
            titulo: this.tarefa.titulo,
            descricao: this.tarefa.descricao,
            concluida: this.tarefa.concluida,
            ativo: this.tarefa.ativo,
          };
          this.tarefas.push(novaTarefa);
          alert("Tarefa salva com sucesso!");
        } else {
          try {
            await tarefasApi.create(this.tarefa);
            await this.carregarTarefas();
            alert("Tarefa salva com sucesso!");
          } catch (error) {
            alert("Erro ao salvar tarefa: " + error.message);
            return;
          }
        }
      }
      this.limparFormulario();
      this.mostrarFormulario = false;
      this.tarefaIndex = null;
    },
    async carregarTarefas() {
      if (useMocks()) {
        this.tarefas = [...mockTarefas];
      } else {
        try {
          const dados = await tarefasApi.getAll();
          this.tarefas = dados || [];
        } catch (error) {
          logger.error("Erro ao carregar tarefas:", error);
          alert("Erro ao carregar tarefas do servidor");
        }
      }
    },
    limparFormulario() {
      this.tarefa = {
        titulo: "",
        descricao: "",
        concluida: false,
        ativo: true,
      };
      this.tarefaIndex = null;
    },
    cancelar() {
      this.limparFormulario();
      this.mostrarFormulario = false;
    },
    editarTarefa(tarefa, index) {
      this.tarefa = { ...tarefa };
      this.mostrarFormulario = true;
      this.tarefaIndex = index;
    },
    async deletarTarefa(tarefa, index) {
      if (confirm(`Tem certeza que deseja deletar a tarefa "${tarefa.titulo}"?`)) {
        if (useMocks()) {
          this.tarefas.splice(index, 1);
          alert("Tarefa deletada com sucesso!");
        } else {
          try {
            await tarefasApi.delete(tarefa.id);
            await this.carregarTarefas();
            alert("Tarefa deletada com sucesso!");
          } catch (error) {
            alert("Erro ao deletar tarefa: " + error.message);
          }
        }
      }
    },
  },
  async mounted() {
    await this.carregarTarefas();
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
