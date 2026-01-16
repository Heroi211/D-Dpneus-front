<template>
  <div class="row">
    <div class="col-12">
      <card>
        <template slot="header">
          <div class="d-flex justify-content-between align-items-center">
            <h4 class="card-title">{{ table1.title }}</h4>
            <button
              class="btn btn-primary btn-sm"
              type="button"
              style="min-width: 40px; height: 40px; border-radius: 50%; font-size: 24px; line-height: 1; padding: 0;"
              title="Adicionar Funcionário"
            >
              +
            </button>
          </div>
        </template>
        <div>
          <base-table
            :data="table1.data"
            :columns="table1.columns"
            thead-classes="text-primary"
            @edit="editarFuncionario"
            @delete="deletarFuncionario"
          >
          </base-table>
        </div>
      </card>
    </div>
  </div>
</template>
<script>
import { BaseTable } from "@/components";
const tableColumns = ["Name", "Country", "City", "Salary", "Ativo", "Ações"];
const tableData = [
  {
    id: 1,
    name: "Dakota Rice",
    salary: "$36.738",
    country: "Niger",
    city: "Oud-Turnhout",
    ativo: true,
  },
  {
    id: 2,
    name: "Minerva Hooper",
    salary: "$23,789",
    country: "Curaçao",
    city: "Sinaai-Waas",
    ativo: true,
  },
  {
    id: 3,
    name: "Sage Rodriguez",
    salary: "$56,142",
    country: "Netherlands",
    city: "Baileux",
    ativo: true,
  },
  {
    id: 4,
    name: "Philip Chaney",
    salary: "$38,735",
    country: "Korea, South",
    city: "Overland Park",
    ativo: true,
  },
  {
    id: 5,
    name: "Doris Greene",
    salary: "$63,542",
    country: "Malawi",
    city: "Feldkirchen in Kärnten",
    ativo: true,
  },
  {
    id: 6,
    name: "Mason Porter",
    salary: "$98,615",
    country: "Chile",
    city: "Gloucester",
    ativo: true,
  },
  {
    id: 7,
    name: "Jon Porter",
    salary: "$78,615",
    country: "Portugal",
    city: "Gloucester",
    ativo: true,
  },
];

export default {
  components: {
    BaseTable,
  },
  data() {
    return {
      table1: {
        title: "Funcionários",
        columns: [...tableColumns],
        data: [...tableData],
      },
    };
  },
  methods: {
    editarFuncionario(funcionario, index) {
      alert(`Editar funcionário: ${funcionario.name}`);
      // Aqui você pode implementar a lógica de edição
    },
    deletarFuncionario(funcionario, index) {
      if (confirm(`Tem certeza que deseja deletar o funcionário ${funcionario.name}?`)) {
        this.table1.data.splice(index, 1);
        alert("Funcionário deletado com sucesso!");
      }
    },
  },
};
</script>
<style scoped>
.table-responsive {
  overflow-x: auto;
  overflow-y: auto;
}

/* Esconde scrollbar mas mantém funcionalidade de rolagem */
.table-responsive::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.table-responsive {
  -ms-overflow-style: none; /* IE e Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
