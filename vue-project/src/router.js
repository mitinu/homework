import mainComponent from "@/main/main.vue";
import authorization from "@/authorization/authorization.vue";
import Vue from "vue"
import VueRouter from "vue-router";

Vue.use(VueRouter)

export default new VueRouter({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "main",
            component: mainComponent
        },
        {
            path: "/authorization",
            name: "authorization",
            component: authorization
        },
        {
            path: "*",
            redirect: {name: "main"}
        }
    ]
})
