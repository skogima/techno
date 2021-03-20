<template>
  <div>
    <div
      class="product"
      v-for="product in products"
      :key="product.id"
      @click="onProductClick(product.id)"
    >
      <img class="product-img" :src="product.img" :alt="product.nome" />

      <div class="product-info">
        <span class="product-price">{{ product.preco | currencyFormat }}</span>
        <h2 class="product-title">{{ product.nome }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["products"],

  methods: {
    onProductClick(id) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      this.$emit("onProductClick", id);
    },
  },
};
</script>

<style scoped>
.product {
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  background: #fff;
  box-shadow: 0 0 2rem rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.product .product-img {
  max-width: 300px;
  margin-right: 40px;
}

.product .product-title {
  font-size: 3rem;
  line-height: 1;
}

.product .product-price {
  color: rgba(0, 0, 0, 0.5);
}

@media screen and (max-width: 900px) {
    .product {
        flex-direction: column;
        align-items: flex-start;
        max-width: 300px;
        margin: 30px auto;
    }

    .product-info {
      padding: 20px;
    }
    
    .product .product-img {
      max-width: 100%;
    }

    .product .product-title {
      font-size: 1.5rem;
    }
}
</style>