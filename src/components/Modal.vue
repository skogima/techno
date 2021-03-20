<template>
  <section class="modal-background" @click.self="closeModal">
    <div class="modal">
      <div class="modal-close">
        <button @click="closeModal">X</button>
      </div>

      <slot></slot>
    </div>
  </section>
</template>

<script>
export default {
  methods: {
    closeModal() {
      this.$emit("onModalClose");
    },
  },
};
</script>


<style scoped>
.modal-background::before {
  content: "";
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100vh;

  background: rgba(0, 0, 0, 0.5);
}

.modal-background {
  position: absolute;
  top: 0px;
  left: 0px;

  width: 100%;

  padding: 80px;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.modal {
  position: relative;
  z-index: 999;
  display: block;

  width: 100%;
  max-width: 800px;

  animation: fadeIn 0.3s;
}

.modal-close {
  position: absolute;
  top: -10px;
  right: -10px;
}

button {
  width: 40px;
  height: 40px;
  border: 2px solid #000;
  background: #fff;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 50%;

  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.1), 0px 4px 10px rgba(0, 0, 0, 0.2);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translate3D(50px, 0, 0);
  }
  to {
    opacity: 1;
    transform: translate3D(0px, 0, 0);
  }
}

@media screen and (max-width: 900px) {
  .modal-background {
      padding: 80px 10px;
  }
}
</style>