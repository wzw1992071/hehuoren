<template>
  <div>
    <p class="card">
      {{text}}
    </p>
  </div>
</template>

<script>
export default {
  props: ['text'],
  data: function () {
    return {
      name: '爆炸鸭脖',
      slogan: '热门',
    }
  }
}
</script>

<style>
.card {
  padding: 10px;
}
</style>
