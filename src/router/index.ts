import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: { name: "products" },
  },
  {
    path: "/products",
    children: [
      {
        path: "create",
        name: "create",
        component: () =>
          import(
            /* webpackChunkName: "create product" */ "../views/CreateProductPage.vue"
          ),
      },
      {
        path: "edit/:id",
        name: "edit",
        component: () =>
          import(
            /* webpackChunkName: "edit product" */ "../views/EditProductPage.vue"
          ),
      },
      {
        path: "",
        name: "products",
        component: () =>
          import(
            /* webpackChunkName: "products" */ "../views/ProductsPage.vue"
          ),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
