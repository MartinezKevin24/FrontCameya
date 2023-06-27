const PageRoutes = {
  dashboard: {
    index: "/dashboard",
    profile: {
      index: "/dashboard/profile",
      edit: "/dashboard/profile/edit",
    },
    services: {
      index: "/dashboard/mis-servicios",
      page: "/dashboard/mis-servicios/[slug]",
      edit: "/dashboard/mis-servicios/edit/[slug]",
    },
    ajustes: "/dashboard/ajustes",
  },
  admin:{
    dashboard: "/admin/dashboard",
    index: "/admin",
    categorias: "/admin/categorias",
    servicios: "/admin/servicios",
  }
}

export default PageRoutes