 <template>
  <div class="container">
    <img :src="product.img" :alt="product.nome" />

    <div class="info">
      <span>{{ product.preco | currencyFormat }}</span>
      <h2 class="title">{{ product.nome }}</h2>
      <p>{{ product.descricao }}</p>

      <button :disabled="isOutOfStock" @click="addItem">
        {{ !isOutOfStock ? "Adicionar Item" : "Produto esgotado" }}
      </button>
    </div>

    <div class="reviews">
      <h2>Avaliações</h2>
      <ul>
        <li class="review" v-for="review in product.reviews" :key="review.nome">
          <p class="description">{{ review.descricao }}</p>
          <p>
            <strong>{{ review.nome }} | {{ review.estrelas }} estrelas</strong>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: ["product"],

  methods: {
    addItem() {
      this.addProductToCart(this.product.id);
      this.$emit("onProductAdded");
    },

    ...mapActions({
      addProductToCart: "cart/addProductToCart",
    }),
  },

  computed: {
    isOutOfStock() {
      const product = this.cartItems.find(
        (item) => item.id === this.product.id
      );
      if (product) {
        return product.quantidade >= this.product.estoque;
      }
      return false;
    },

    ...mapGetters({
      cartItems: "cart/getShoppingCart",
    }),
  },
};
</script>

<style scoped>
.container {
  display: grid;
  align-items: end;
  gap: 50px;
  padding: 0 50px 50px 0;
  z-index: 9999;
  background: linear-gradient(to right, transparent 250px, #fff 250px);
}

img {
  width: 300px;
  margin-top: 50px;

  display: block;

  grid-column: 1;

  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.1), 0px 4px 10px rgba(0, 0, 0, 0.2);
}

.info {
  max-width: 600px;
  grid-column: 2;
}

.title {
  font-size: 3rem;
}

button {
  margin-top: 80px;
  background: #000;
  cursor: pointer;
  color: #fff;
  border: none;
  font-size: 1rem;
  padding: 10px 25px;
}

button:disabled {
  opacity: 0.3;
  cursor: default;
}

.reviews {
  grid-column: 2;
}

.reviews > h2 {
  font-size: 1.75rem;
}

.review {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 20px;
}

.description {
  margin: 20px 0px 5px 0px;
}

@media screen and (max-width: 900px) {
  .container {
    gap: 20px;
    background: #fff;
    padding: 10px 0px;
  }

  img {
    grid-row: 2;
    max-width: initial;
    margin-top: 0px;
    width: 100%;
  }

  .info {
    grid-column: 1;
    padding: 10px;
  }

  .reviews {
    grid-column: 1;
    padding: 10px;
  }

  button {
    margin-top: 20px;
  }
}
</style>