<template>
  <table class="table tablesorter" :class="tableClass">
    <thead :class="theadClasses">
      <tr>
        <slot name="columns">
          <th v-for="column in columns" :key="column" :style="column.toLowerCase() === 'ações' ? 'text-align: right;' : ''">{{ column }}</th>
        </slot>
      </tr>
    </thead>
    <tbody :class="tbodyClasses">
      <tr v-for="(item, index) in data" :key="index">
        <slot :row="item" :index="index">
          <template v-for="(column, colIndex) in columns">
            <td :key="colIndex" v-if="column.toLowerCase() !== 'ações' && hasValue(item, column)">
              <span v-if="column.toLowerCase() === 'ativo'" :style="{ color: itemValue(item, column) ? '#4caf50' : '#f44336', fontSize: '18px', fontWeight: 'bold' }">
                {{ itemValue(item, column) ? '✓' : '✗' }}
              </span>
              <span v-else>{{ itemValue(item, column) }}</span>
            </td>
            <td :key="colIndex" v-if="column.toLowerCase() === 'ações'" class="text-right" style="text-align: right;">
              <base-dropdown
                tag="div"
                menu-on-right
                title-classes="btn btn-link btn-icon"
                aria-label="Menu de ações"
                style="display: inline-block;"
              >
                <i slot="title" class="tim-icons icon-settings-gear-63"></i>
                <a href="#" class="dropdown-item" @click.prevent="$emit('edit', item, index)">
                  <i class="tim-icons icon-pencil"></i>
                  Editar
                </a>
                <a href="#" class="dropdown-item" @click.prevent="$emit('delete', item, index)" style="color: #f44336;">
                  <i class="tim-icons icon-simple-remove"></i>
                  Deletar
                </a>
              </base-dropdown>
            </td>
          </template>
        </slot>
      </tr>
    </tbody>
  </table>
</template>
<script>
import { BaseDropdown } from "@/components";

export default {
  name: "base-table",
  components: {
    BaseDropdown,
  },
  props: {
    columns: {
      type: Array,
      default: () => [],
      description: "Table columns",
    },
    data: {
      type: Array,
      default: () => [],
      description: "Table data",
    },
    type: {
      type: String, // striped | hover
      default: "",
      description: "Whether table is striped or hover type",
    },
    theadClasses: {
      type: String,
      default: "",
      description: "<thead> css classes",
    },
    tbodyClasses: {
      type: String,
      default: "",
      description: "<tbody> css classes",
    },
  },
  computed: {
    tableClass() {
      return this.type && `table-${this.type}`;
    },
  },
  methods: {
    hasValue(item, column) {
      return item[column.toLowerCase()] !== "undefined";
    },
    itemValue(item, column) {
      return item[column.toLowerCase()];
    },
  },
};
</script>
<style></style>
