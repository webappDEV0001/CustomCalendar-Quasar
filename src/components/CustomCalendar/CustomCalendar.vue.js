export default {
  name: 'MyLayout',
  data () {
    return {
      first: new Date(),
      second: new Date(),
      dateString1: '',
      dateString2: '',
      range: 'one',
      selectedOption: 'Today'
    }
  },
  methods: {
    select (title) {
      console.log(title)
      this.selectedOption = title
    },
    isSelected (title) {
      if (title === 'This Week') {
        return 'primary'
      } else {
        return ''
      }
    }
  }
}