<template>
  <div id="app" :class="isModalOpen ? 'disable-scroll' : ''">
    <techno-header />

    <alert-message :active="showAlert">
      <p>{{ alertMessage }}</p>
    </alert-message>

    <modal-dialog
      v-if="Object.keys(selectedProduct).length !== 0"
      @onModalClose="onProductModalClose"
    >
      <product-item
        @onProductAdded="onProductAdded"
        :product="selectedProduct"
      />
    </modal-dialog>

    <section id="products">
      <product-list
        :products="products"
        @onProductClick="(id) => fetchProduct(id)"
      />
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import TechnoHeader from "@/components/Header.vue";
import Modal from "@/components/Modal.vue";
import Product from "@/components/Product.vue";
import ProductList from "@/components/ProductList.vue";
import Alert from "@/components/Alert.vue";

export default {
  name: "App",

  components: {
    "alert-message": Alert,
    "techno-header": TechnoHeader,
    "modal-dialog": Modal,
    "product-item": Product,
    "product-list": ProductList,
  },

  data: () => ({
    selectedProduct: {},
    isModalOpen: false,
    showAlert: false,
    alertMessage: "",
  }),

  async created() {
    await this.fetchProducts();
  },

  methods: {
    async fetchProduct(id) {
      const resp = await fetch(`/api/produtos/${id}/dados.json`);
      const product = await resp.json();

      this.selectedProduct = product;
    },

    onProductModalClose() {
      this.selectedProduct = {};
    },

    alert(message) {
      this.alertMessage = message;
      this.showAlert = true;
      setTimeout(() => {
        this.showAlert = false;
      }, 2000);
    },

    onProductAdded() {
      this.alert("Produto adicionado ao carrinho.");
    },

    ...mapActions({
      fetchProducts: "products/fetchProducts",
    }),
  },

  computed: {
    ...mapGetters({
      products: "products/getProducts",
    }),
  },

  watch: {
    selectedProduct() {
      const isOpen = Object.keys(this.selectedProduct).length !== 0;
      if (isOpen) document.body.classList.add("disable-scroll");
      else document.body.classList.remove("disable-scroll");
    },
  },
};
</script>

<style scoped>
#products {
  max-width: 900px;
  margin: 100px auto 0 auto;
}

.disable-scroll {
  overflow: hidden !important;
}

@media screen and (max-width: 900px) {
  #products {
    margin-top: 40px;
  }
}
</style>