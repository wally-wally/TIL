<script>
import axios from 'axios';

export default {
  props: ['url'],
  data() {
    return {
      response: null,
      loading: true,
    }
  },
  created() {
    axios.get(this.url)
      .then(response => {
        this.response = response.data;
        this.loading = false;
      })
      .catch(error => {
        alert('[ERROR] fetching the data', error);
        console.log(error);
      });
  },
  render() {
    return this.$scopedSlots.default({ // created()에서 데이터를 받고 여기서 slot-scope으로 선언한 부분으로 단순히 데이터를 넘겨준다.
      response: this.response,
      loading: this.loading,
    });
  },
}
</script>