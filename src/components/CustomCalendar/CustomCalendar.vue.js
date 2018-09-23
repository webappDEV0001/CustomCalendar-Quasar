export default {
  name: 'MyLayout',
  data () {
    return {
      first: undefined,
      second: undefined,
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
    getDateString (date) {
      date = new Date(date)
      let month = ' ' + (date.getMonth() + 1)
      let day = '' + date.getDate()
      let year = date.getFullYear()

      return month + '/' + day + '/' + year
    },
    selectFirst () {
      this.dateString1 = this.getDateString(this.first)
    },
    selectSecond () {
      this.dateString2 = this.getDateString(this.second)
    }
  }
}