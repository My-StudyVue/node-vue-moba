export default {
  computed: {
    uploadUrl() {
      return `${this.$http.defaults.baseURL}/upload`
    },
    getAuthHeaders() {
      return {
        Authorization: `Bearer ${localStorage.token || ''}`
      }
    }
  },
  methods: {

  }
};
