…
import { productsRef } from '../firebase';
export default {
  name: 'imain',
  firebase: {
      products: productsRef
  },
…
  computed: {
    ...mapGetters([
        'session'
    ])
…
