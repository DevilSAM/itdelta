<template>
  <header-component></header-component>
  <images-list-component></images-list-component>
</template>

<script lang="ts">
import HeaderComponent from "../components/HeaderComponent.vue";
import ImagesListComponent from '../components/ImagesListComponent.vue';

export default {
  name: "HomePage",
  components: { HeaderComponent, ImagesListComponent },

  data() {
    return {}
  },
}
</script>
