const state = () => ({
    products: [],
});

const getters = {
    getProducts: (state) => {
        return state.products;
    }
}

const actions = {
    async fetchProducts({ commit }) {
        const resp = await fetch("/api/produtos.json");
        const products = await resp.json();
        
        commit('setProducts', products);
    },
}

const mutations = {
    setProducts(state, products) {
        state.products = products;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}