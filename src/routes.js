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
    status: "PENDING"
  },
  {
    path: "/dashboard/finished",
    name: "Terminadas",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
    status: "FINISHED"
  },
];

export default dashboardRoutes;
