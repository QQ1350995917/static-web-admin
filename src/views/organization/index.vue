<script>
  import { fetchRoot } from '@/api/organization'
  export default {
    name: 'index',
    data() {
      return {}
    },
    created() {
      this.getList()
    },
    methods: {
      async getList() {
        this.loading = true
        const data = await fetchRoot()
        console.log("fetchRoot:" + data)
        this.$router.push({path: '/organization'})
      }
    }
  }
</script>

<style scoped>

</style>
