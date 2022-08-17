<template>
  <div class="images-list">
    <div class="container-fluid" >
      <div class="row">
        <div class="col-12 col-sm-6 col-xl-4 image-wrapper mb-3" v-for="image in images" :key="image.id">
          <img :src="image.url"
               alt="картинка"
               class="image"
               data-bs-toggle="modal"
               data-bs-target="#commentsFormModal"
               @click="chooseImage(image)"
          >
          <p class="image-caption">id: {{image.id}}</p>
        </div>
      </div>
    </div>

    <modal-component :img_url="current_img_url"
                     :img_id="current_img_id"
    ></modal-component>
  </div>
</template>

<script>
import ModalComponent from "./ModalComponent.vue";
import axios from "redaxios";

export default {
  name: "MainComponent",
  components: { ModalComponent },

  data: ()=>({
    images: [],
    current_img_url: '',
    current_img_id: ''
  }),

  mounted() {
    this.getImages()
  },

  methods: {
    getImages(){
      axios.get('https://boiling-refuge-66454.herokuapp.com/images')
        .then(response => {
          this.images = response.data
        })
        .catch(error =>{
          console.log(error);
          alert('Неизвестная шибка. Перезагрузите страницу.')
        })
    },

    // выбираем конкретую картинку
    chooseImage(image){
      this.current_img_url=image.url
      this.current_img_id=image.id
    }

  },

}
</script>
