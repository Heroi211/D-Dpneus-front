<template>
  <div class="row">
    <div class="col-12">
      <card>
        <template slot="header">
          <div class="d-flex justify-content-between align-items-center">
            <h4 class="card-title">Cadastro de Categoria</h4>
            <button
              class="btn btn-primary btn-sm"
              type="button"
              style="min-width: 40px; height: 40px; border-radius: 50%; font-size: 24px; line-height: 1; padding: 0;"
              title="Adicionar Categoria"
              @click="mostrarFormulario = true"
            >
              +
            </button>
          </div>
        </template>
        <div v-if="!mostrarFormulario">
          <base-table
            :data="categorias"
            :columns="columns"
            thead-classes="text-primary"
            @edit="editarCategoria"
            @delete="deletarCategoria"
          >
          </base-table>
        </div>
        <div v-else class="card-body">
          <form @submit.prevent="salvarCategoria">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label>Nome *</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="categoria.nome"
                    placeholder="Digite o nome da categoria"
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
                      v-model="categoria.ativo"
                      style="margin-right: 8px;"
                    />
                    Ativo
                  </label>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <button type="submit" class="btn btn-primary">Salvar Categoria</button>
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
  name: "CadastroCategoria",
  components: {
    BaseTable,
  },
  data() {
    return {
      columns: ["Nome", "Ativo", "Ações"],
      categorias: [],
      mostrarFormulario: false,
      categoriaIndex: null,
      categoria: {
        nome: "",
        ativo: true,
      },
    };
  },
  methods: {
    salvarCategoria() {
      if (this.categoriaIndex !== null) {
        // Editar categoria existente
        this.categorias[this.categoriaIndex] = {
          ...this.categoria,
          id: this.categorias[this.categoriaIndex].id,
        };
        alert("Categoria atualizada com sucesso!");
      } else {
        // Adicionar nova categoria
        const novaCategoria = {
          id: this.categorias.length + 1,
          nome: this.categoria.nome,
          ativo: this.categoria.ativo,
        };
        this.categorias.push(novaCategoria);
        alert("Categoria salva com sucesso!");
      }
      this.limparFormulario();
      this.mostrarFormulario = false;
      this.categoriaIndex = null;
    },
    limparFormulario() {
      this.categoria = {
        nome: "",
        ativo: true,
      };
      this.categoriaIndex = null;
    },
    cancelar() {
      this.limparFormulario();
      this.mostrarFormulario = false;
    },
    editarCategoria(categoria, index) {
      this.categoria = { ...categoria };
      this.mostrarFormulario = true;
      this.categoriaIndex = index;
    },
    deletarCategoria(categoria, index) {
      if (confirm(`Tem certeza que deseja deletar a categoria ${categoria.nome}?`)) {
        this.categorias.splice(index, 1);
        alert("Categoria deletada com sucesso!");
      }
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
