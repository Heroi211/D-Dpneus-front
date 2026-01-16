<template>
  <div>
    <div class="row">
      <div class="col-12">
        <card>
          <template slot="header">
            <h4 class="card-title">Lançar Venda</h4>
            <p class="card-category">Cadastro de nova venda</p>
          </template>
          <div class="card-body">
            <form @submit.prevent="salvarVenda">
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Cliente</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="venda.cliente"
                      placeholder="Nome do cliente"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Produto/Serviço</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="venda.produto"
                      placeholder="Descrição do produto ou serviço"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-4">
                  <div class="form-group">
                    <label>Quantidade</label>
                    <input
                      type="number"
                      class="form-control"
                      v-model="venda.quantidade"
                      placeholder="0"
                    />
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label>Valor Unitário</label>
                    <input
                      type="number"
                      step="0.01"
                      class="form-control"
                      v-model="venda.valorUnitario"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label>Valor Total</label>
                    <input
                      type="number"
                      step="0.01"
                      class="form-control"
                      v-model="valorTotal"
                      placeholder="0.00"
                      readonly
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <label>Observações</label>
                    <textarea
                      class="form-control"
                      rows="3"
                      v-model="venda.observacoes"
                      placeholder="Observações adicionais..."
                    ></textarea>
                  </div>
                </div>
              </div>
              <button type="submit" class="btn btn-primary">Salvar Venda</button>
              <button
                type="button"
                class="btn btn-default"
                @click="$router.go(-1)"
              >
                Cancelar
              </button>
            </form>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NovaVenda",
  data() {
    return {
      venda: {
        cliente: "",
        produto: "",
        quantidade: "",
        valorUnitario: "",
        observacoes: "",
      },
    };
  },
  computed: {
    valorTotal() {
      const quantidade = parseFloat(this.venda.quantidade) || 0;
      const valorUnitario = parseFloat(this.venda.valorUnitario) || 0;
      return (quantidade * valorUnitario).toFixed(2);
    },
  },
  methods: {
    salvarVenda() {
      // Aqui você pode adicionar a lógica para salvar a venda
      console.log("Venda salva:", { ...this.venda, valorTotal: this.valorTotal });
      alert("Venda salva com sucesso!");
      this.limparFormulario();
    },
    limparFormulario() {
      this.venda = {
        cliente: "",
        produto: "",
        quantidade: "",
        valorUnitario: "",
        observacoes: "",
      };
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
