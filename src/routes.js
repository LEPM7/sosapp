import Dashboard from "@material-ui/icons/Dashboard";
import DashboardPage from "views/Dashboard/Dashboard.jsx";

const dashboardRoutes = [
  {
    path: "/dashboard/new",
    name: "Nuevas",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
    status: "NEW"
  },
  {
    path: "/dashboard/pending",
    name: "Pendientes",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
    status: "ONROAD"
  },
  {
    path: "/dashboard/finished",
    name: "Terminadas",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
    status: "FULFILLED"
  },
];

export default dashboardRoutes;
