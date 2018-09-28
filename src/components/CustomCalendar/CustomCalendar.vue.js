import DatePicker from 'components/vuejs-datepicker'

export default {
  name: 'MyLayout',

  components: {
    DatePicker
  },

  data () {
    return {
      first: new Date(),
      second: new Date(),
      dateString1: '',
      dateString2: '',
      range: 'one',
      selectedOption: 'Fixed Dates',
      firstInputError: false,
      secondInputError: false
    }
  },

  mounted () {
    this.selectFirst(this.first)
    this.selectSecond(this.second)
  },

  methods: {
    onFinishFirst () {
      const dateRegExp = new RegExp(/^([1-9]|1[0-2])\/([1-9]|[12][0-9]|3[01])\/[0-9]{4}$/)
      this.dateString1 = this.dateString1.replace(/ /g,'')
      if (dateRegExp.test(this.dateString1)) {
        let date = new Date(this.dateString1)
        if (this.first.getTime() > date.getTime()) {
          this.first = date
          this.firstInputError = false
        } else {
          this.firstInputError = true
        }
      } else {
        this.firstInputError = true
      }
    },
    onFinishSecond () {
      const dateRegExp = new RegExp(/^([1-9]|1[0-2])\/([1-9]|[12][0-9]|3[01])\/[0-9]{4}$/)
      this.dateString2 = this.dateString2.replace(/ /g,'')
      if (dateRegExp.test(this.dateString2)) {
        let date = new Date(this.dateString2)
        if (this.first.getTime() < date.getTime()) {
          this.second = date
          this.secondInputError = false
        } else {
          this.secondInputError = true
        }
      } else {
        this.secondInputError = true
      }
    },
    checkRanges () {
      let highlighted = {
        from: this.first,
        to: this.second
      }
      if (this.dateString1 === this.dateString2) {
        highlighted = {
          dates: []
        }
      }
      return highlighted
    },
    disabledFirstDates () {
      let disabledDates = {
        from: this.second
      }
      return disabledDates
    },
    disabledSecondDates() {
      let disabledDates = {
        to: this.first
      }
      return disabledDates
    },
    select (title) {
      console.log(title)
      this.selectedOption = title
    },
    getDateString (date) {
      date = new Date(date)
      let month = ' ' + (date.getMonth() + 1)
      let day = '' + date.getDate(0)
      let year = date.getFullYear()

      return month + '/' + day + '/' + year
    },
    selectFirst (val) {
      this.firstInputError = false
      this.first = val
      this.dateString1 = this.getDateString(this.first)
    },
    selectSecond (val) {
      this.secondInputError = false
      this.second = val
      this.dateString2 = this.getDateString(this.second)
    },
    select (strRange) {
      this.selectedOption = strRange

      if (strRange === 'Today') {
        this.first = new Date()
        this.second = new Date()
      }
      if (strRange === 'This Week') {
        this.first = this.getFirstDateOfThisWeek()
        this.second = this.getLastDateOfThisWeek()
      } 
      if (strRange == 'Last Week') {
        this.first = this.getFirstDateOfLastWeek()
        this.second = this.getLastDateOfLastWeek()
      }
      if (strRange === 'This Month') {
        let d = new Date()
        this.first = new Date(d.getFullYear(), d.getMonth(), 1)
        this.second = new Date(d.getFullYear(), d.getMonth() + 1, 0)
      } 
      if (strRange == 'Last Month') {
        let d = new Date()
        this.first = new Date(d.getFullYear(), d.getMonth() - 1, 1)
        this.second = new Date(d.getFullYear(), d.getMonth(), 0)
      }
      if (strRange === 'All Time') {
        this.first = new Date()
        this.second = new Date()
      }
      if (strRange === 'Fixed Dates') {
        this.first = new Date()
        this.second = new Date()
      } 
      
      this.dateString1 = this.getDateString(this.first)
      this.dateString2 = this.getDateString(this.second)


    },
    getFirstDateOfThisWeek() {
      let d = new Date();
      let day = d.getDay()
      let diff = d.getDate() - day + (day == 0 ? -7 : 0)
      return new Date(d.getFullYear(), d.getMonth(), diff)
    },
    getLastDateOfThisWeek() {
      let d = new Date();
      let day = d.getDay()
      let diff = d.getDate() - day + 6
      return new Date(d.getFullYear(), d.getMonth(), diff)
    },
    getFirstDateOfLastWeek() {
      let d = new Date();
      let day = d.getDay()
      let diff = d.getDate() - day - 7
      return new Date(d.getFullYear(), d.getMonth(), diff)
    },
    getLastDateOfLastWeek() {
      let d = new Date();
      let day = d.getDay()
      let diff = d.getDate() - day - 1
      return new Date(d.getFullYear(), d.getMonth(), diff)
    },
    onClear () {
      this.first = undefined
      this.second = undefined
      this.dateString1 = ''
      this.dateString2 = ''
      this.selectedOption = 'Fixed Dates'
    }
  }
}