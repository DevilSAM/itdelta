<template>
  <div class="modal fade" id="commentsFormModal" tabindex="-1" aria-labelledby="commentsFormModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content" :class="{faded: loading}">

        <div class="modal-body">

          <!-- спиннер для обозначения загрузки -->
          <div v-if="loading"
               class="spinner spinner-border text-primary d-block mx-auto spinner-modal"
               role="status">
            <span class="visually-hidden">Loading...</span>
          </div>

          <!-- Большая картинка -->
          <div class="image-block" v-if="image_data.url">
            <img :src="image_data.url" alt="картинка" class="big-image d-block mx-auto">
          </div>

          <!-- список комментариев -->
          <div class="comments-list mt-5" v-if="image_data.comments && image_data.comments.length > 0">
            Список комментариев:
            <div class="comment-wrapper" v-for="comment in image_data.comments" :key="comment.id">
              <p class="comment-id">#{{ comment.id }}:</p>
              <div class="comment-data">
                <p class="comment-text mb-0">{{ comment.text }}</p>
                <p class="comment-date mb-0">Добавлен: {{ formatDate(comment.date) }}</p>
              </div>
            </div>
          </div>

          <!-- форма отправки коммента -->
          <form action="" id="commentForm" class="form">
            <label for="comment" class="form-label">Comment</label>
            <div class="input-group mb-3">
              <textarea class="form-control" rows="5" id="comment" name="comment" v-model="comment" ></textarea>
            </div>
            <p class="under-comment-text">Write a few sentences about the photo.</p>
          </form>

        </div>

        <!-- оповещение об успешной отправке коммента-->
        <div class="alert alert-success alert-dismissible fade show" role="alert" v-if="comment_success">
          <strong>Спасибо!</strong> Ваш комментарий добавлен
          <button type="button" class="btn-close" aria-label="Close" @click="comment_success=false"></button>
        </div>
        <!-- оповещение об ошибке при отправке коммента-->
        <div class="alert alert-danger alert-dismissible fade show" role="alert" v-if="comment_error">
          <strong>Внимание!</strong> Произошла ошибка. Попробуйте перезагрузить страницу.
          <button type="button" class="btn-close" aria-label="Close" @click="comment_error=false"></button>
        </div>

        <!-- кнопка отправки комментария -->
        <div class="modal-footer" v-if="!(comment_success || comment_error)">
          <button class="btn btn-modal mx-auto mb-4" @click="sendComment" :disabled="loading || !comment">Save</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import axios from "redaxios";

export default {
  name: "ModalComponent",

  props: {
    img_id: '',
  },

  data: ()=>({
    loading: false,
    comment: '',
    comment_success: false,
    comment_error: false,
    image_data: {}
  }),

  watch: {
    'img_id': function(){
      this.getImageData()
    }
  },

  methods: {

    // загрузка данных конкретной фотки
    getImageData(){
      this.image_data = {}
      this.loading = true
      axios.get(`https://boiling-refuge-66454.herokuapp.com/images/${this.img_id}`)
        .then(response => {
          this.loading = false
          this.image_data = response.data
        })
        .catch(error =>{
          console.log(error);
          alert('Неизвестная шибка. Перезагрузите страницу.')
        })
    },


    // отправка комментария на сервер
    sendComment(){
      this.loading = true
      axios.post(`https://boiling-refuge-66454.herokuapp.com/images/${this.img_id}/comments`, {
        name: 'Ricardo',
        comment: this.comment
      })
        .then( () => {
          this.loading = false
          this.comment_success = true
          // сразу добавим локально, для видимости добавления
          this.image_data.comments.push({
            id: 777,
            text: this.comment,
            date: +new Date()
          })
          // обнулим ввод коммента
          this.comment = ''
        })
        .catch( error => {
          console.log(error)
          this.loading = false
          this.comment_error = true
        });
    },

    // форматирование даты
    formatDate(data){
      return new Intl.DateTimeFormat('ru-RU').format(new Date(data))
    }
  }
}
</script>
