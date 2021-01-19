<template>
  <div class='wrap'>
    <div v-if="!network">
      <h3>我没网了</h3>
      <div @click="onRefresh">刷新</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: [],
  components: {

  },
  data () {
    return {

    }
  },
  computed: {
    ...mapState(['network'])
  },
  methods: {
    // 通过跳转一个空页面再返回的方式来实现刷新当前页面数据的目的
    onRefresh () {
      this.$router.replace('/refresh')
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$router.replace(from.fullPath)
    })
  }
}
</script>

<style scoped lang='scss'>
</style>
