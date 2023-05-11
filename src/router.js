import { createRouter, createWebHistory} from "vue-router";
import AppCart from './components/AppCart';
import AppCatalog from './components/AppCatalog';
import AppError from './components/AppError';
import AppCheckout from './components/AppCheckout';

const routes = [
    {   name: "inCatalog",
        path:'/',
        component:AppCatalog,
    },
    {   
        name: "inCart",
        path:'/cart',
        component:AppCart,
    },
    {
        name: "inError",
        path:'/:any(.*)',
        component:AppError,
    },
    {
        name: "inOrder",
        path:'/order',
        component:AppCheckout,
    },


]

export default createRouter ({
    routes,
    history: createWebHistory()
})