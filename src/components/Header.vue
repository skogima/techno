<template>
  <header>
    <img :src="require('../assets/techno.svg')" alt="Logo" class="logo" />

    <modal-dialog v-if="openCart" @onModalClose="openCart = false">
      <shopping-cart :cartPrice="cartPrice" />
    </modal-dialog>

    <div @click="openCart = true" class="shopping-cart">
      {{ cartPrice | currencyFormat }} |
      {{ cartItemCount }}
    </div>
  </header>
</template>

<script>
import { mapGetters } from "vuex";
import Modal from "@/components/Modal.vue";
import ShoppingCart from "@/components/ShoppingCart.vue";

export default {
  components: {
    "modal-dialog": Modal,
    "shopping-cart": ShoppingCart,
  },

  data() {
    return {
      openCart: false,
      shoppingCartTotal: 0,
    };
  },

  computed: {
    cartPrice() {
      return this.cartItems.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
    },
    
    cartItemCount() {
      return this.cartItems.reduce((acc, item) => acc + item.quantidade, 0)
    },

    ...mapGetters({
      cartItems: "cart/getShoppingCart",
    }),
  },
};
</script>

<style scoped>
header {
  width: 100%;
  max-width: 900px;
  height: 60px;

  margin: 0 auto;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  color: white;
}

.logo {
  width: 80px;
}

.shopping-cart::after {
  content: "";
  display: inline-block;
  background: url("../assets/carrinho.svg") no-repeat center center;
  width: 25px;
  height: 25px;
  margin-left: 10px;
}

.shopping-cart {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.icon-button {
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
}
</style>
