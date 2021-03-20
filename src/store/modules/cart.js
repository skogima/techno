const state = () => ({
    items: [],
});

const getters = {
    getShoppingCart: (state, _, rootState) => {
        const { products } = rootState.products;
        const cartItems = state.items.map(item => {
            const product = products.find(({ id }) => id === item.id);
            return {
                ...item,
                preco: product.preco,
                nome: product.nome,
            }
        });
        return cartItems;
    }
}

const actions = {
    addProductToCart({ commit, state }, productId) {
        const cartItem = state.items.find(({ id }) => id === productId);

        if (!cartItem) {
            commit('addProductToCart', productId);
        }
        else {
            commit('incrementItemQuantity', productId);
        }
    },

    checkout({ commit }) {
        commit('checkout');
    },

    removeProductFromCart({ commit }, productId) {
        commit('removeProductFromCart', productId);
    }
}

const mutations = {
    addProductToCart(state, id) {
        state.items.push({ id, quantidade: 1 });
    },

    checkout(state) {
        state.items = [];
    },

    incrementItemQuantity(state, id) {
        const cartItem = state.items.find(product => product.id === id);
        cartItem.quantidade++;
    },

    removeProductFromCart(state, id) {
        const found = state.items.find(product => product.id === id);
        if (!found) return;

        if (found.quantidade > 1) {
            found.quantidade--;
        }
        else {
            state.items = state.items.filter(product => product.id !== id);
        }
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}