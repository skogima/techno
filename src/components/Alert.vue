<template>
  <div class="container" :class="active ? 'active' : ''">
    <div class="alert">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ["active"],
};
</script>


<style scoped>
.container {
  position: fixed;
  left: 0px;
  top: 24px;
  z-index: 9999;
  width: 100%;

  pointer-events: none;

  display: none;

  animation: fadeInDown 0.4s forwards;
}

.active {
  display: flex;
  justify-content: center;
}

.alert {
  display: inline-block;
  background: #fff;
  border: 2px solid #000;
  padding: 20px 40px;

  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.1), 0px 4px 10px rgba(0, 0, 0, 0.2);

  display: flex;
  justify-content: center;
  align-items: center;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translate3d(0, -30px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
</style>