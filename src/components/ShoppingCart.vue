<template>
  <div class="container">
    <h1>Carrinho</h1>

    <p v-if="cartItems.length === 0">Seu carrinho está vazio</p>

    <template v-else>
      <ul class="cart-items">
        <li class="cart-item" v-for="cartItem in cartItems" :key="cartItem.id">
          <span>{{ `${cartItem.nome} (${cartItem.quantidade})` }}</span>
          <span class="price">{{
            (cartItem.quantidade * cartItem.preco) | currencyFormat
          }}</span>
          <button class="remove" @click="onRemoveItem(cartItem.id)">X</button>
        </li>
        <li class="cart-item">
          <strong>Total</strong>
          <span class="price">{{ cartPrice | currencyFormat }}</span>
        </li>
      </ul>

      <button class="checkout" @click="onCheckout">Finalizar compra</button>
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: ["cartPrice"],

  methods: {
    onCheckout() {
      this.doCheckout();
    },

    onRemoveItem(id) {
      this.removeItem(id);
    },

    ...mapActions({
      doCheckout: 'cart/checkout',
      removeItem: 'cart/removeProductFromCart',
    }),
  },

  computed: {
    ...mapGetters({
      cartItems: "cart/getShoppingCart",
    }),
  },
};
</script>

<style scoped>
.container {
  background: #fff;
  padding: 32px;
}

h1 {
  margin-bottom: 10px;
  padding-bottom: 20px;
}

.price {
  text-align: right;
}

.cart-items {
  list-style: none;

  border-top: 2px solid #000;
  border-bottom: 2px solid #000;
}

.cart-items .cart-item {
  display: grid;
  grid-template-columns: 1fr 1fr 50px;
  padding: 12px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.cart-items .cart-item:last-child {
  border: none;
}

.checkout {
  display: block;
  margin-top: 24px;
  margin-left: auto;
  background: #000;
  color: #fff;
  cursor: pointer;
  border: none;
  font-size: 1rem;
  padding: 10px 25px;
}

.remove {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  background: #fff;
  margin-left: 8px;
  font-size: 0.8rem;
}

@media screen and (max-width: 900px) {
  .container {
    width: 100%;
  }
}
</style>