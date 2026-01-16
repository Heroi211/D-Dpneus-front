import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pages
const Dashboard = () =>
  import(/* webpackChunkName: "dashboard" */ "@/pages/Dashboard.vue");
const Profile = () =>
  import(/* webpackChunkName: "common" */ "@/pages/Profile.vue");
const Notifications = () =>
  import(/* webpackChunkName: "common" */ "@/pages/Notifications.vue");
const Icons = () =>
  import(/* webpackChunkName: "common" */ "@/pages/Icons.vue");
const Maps = () => import(/* webpackChunkName: "common" */ "@/pages/Maps.vue");
const Typography = () =>
  import(/* webpackChunkName: "common" */ "@/pages/Typography.vue");
const TableList = () =>
  import(/* webpackChunkName: "common" */ "@/pages/TableList.vue");
const CadastroCliente = () =>
  import(/* webpackChunkName: "common" */ "@/pages/CadastroCliente.vue");
const CadastroEstoque = () =>
  import(/* webpackChunkName: "common" */ "@/pages/CadastroEstoque.vue");
const CadastroFornecedores = () =>
  import(/* webpackChunkName: "common" */ "@/pages/CadastroFornecedores.vue");
const CadastroCategoria = () =>
  import(/* webpackChunkName: "common" */ "@/pages/CadastroCategoria.vue");
const NovaVenda = () =>
  import(/* webpackChunkName: "common" */ "@/pages/NovaVenda.vue");
const LoginPage = () =>
  import(/* webpackChunkName: "common" */ "@/pages/Login/LoginPage.vue");

const routes = [
  {
    path: "/login",
    name: "login",
    component: LoginPage,
  },
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard,
      },
      {
        path: "profile",
        name: "profile",
        component: Profile,
      },
      {
        path: "notifications",
        name: "notifications",
        component: Notifications,
      },
      {
        path: "icons",
        name: "icons",
        component: Icons,
      },
      {
        path: "maps",
        name: "maps",
        component: Maps,
      },
      {
        path: "typography",
        name: "typography",
        component: Typography,
      },
      {
        path: "table-list",
        name: "table-list",
        component: TableList,
      },
      {
        path: "cadastro-cliente",
        name: "cadastro-cliente",
        component: CadastroCliente,
      },
      {
        path: "cadastro-estoque",
        name: "cadastro-estoque",
        component: CadastroEstoque,
      },
      {
        path: "cadastro-fornecedores",
        name: "cadastro-fornecedores",
        component: CadastroFornecedores,
      },
      {
        path: "cadastro-categoria",
        name: "cadastro-categoria",
        component: CadastroCategoria,
      },
      {
        path: "nova-venda",
        name: "nova-venda",
        component: NovaVenda,
      },
    ],
  },
  { path: "*", component: NotFound },
];


export default routes;
