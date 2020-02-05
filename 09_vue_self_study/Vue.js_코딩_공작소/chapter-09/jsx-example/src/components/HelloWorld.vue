<script>
export default {
  name: 'HelloWorld',
  render(h) {
    return (
      <div>
        <div class="text-center"
          on-click={this.pressed}
          domPropsInnerHTML={this.msg}></div>
      </div>
    )
  },
  data () {
    return {
      msg: `<h${this.header}>안녕하세요 ${this.name}</h${this.header}>`,
    }
  },
  methods: {
    pressed() {
      alert('클릭됨')
    }
  },
  props:['header', 'name']
}
</script>

<style>
</style>
