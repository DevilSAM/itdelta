<template>
  <header>
    <div class="header-bg"></div>
    <div class="header-menu container">
      <img src="/src/images/avatar.png" alt="автарка" class="avatar">
      <h4 class="name">Ricardo Cooper</h4>
      <div class="header-buttons">
        <button class="btn me-3">
          <img src="/src/images/mail-icon.png" alt="иконка почты" width="20" class="me-2">
          Message
        </button>
        <button class="btn">
          <img src="/src/images/phone-icon.png" alt="иконка телефона" width="20" class="me-2">
          Call
        </button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderComponent"
}
</script>
