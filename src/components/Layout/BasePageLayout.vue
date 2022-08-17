<template>
  <div class="min-vh-100 d-flex flex-column justify-content-between">
    <page-header></page-header>
    <div class="container flex-grow-1 py-3">
      <slot></slot>
    </div>
    <page-footer></page-footer>
  </div>
</template>

<script lang="ts">
import PageHeader from "./PageHeader.vue";
import PageFooter from "./PageFooter.vue";

export default {
  name: "BasePageLayout",
  components: {PageFooter, PageHeader}
}
</script>

<style scoped>

</style>
