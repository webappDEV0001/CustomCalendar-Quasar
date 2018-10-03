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
      firstTemp: undefined,
      secondTemp: undefined,
      dateString1: '',
      dateString2: '',
      range: 'one',
      selectedOption: 'All Time',
      firstInputError: false,
      secondInputError: false
    }
  },

  mounted () {
    // this.selectFirst(this.first)
    // this.selectSecond(this.second)
  },

  methods: {
    onFinishFirst () {
      const dateRegExp = new RegExp(/^([1-9]|1[0-2])\/([1-9]|[12][0-9]|3[01])\/[0-9]{4}$/)
      this.dateString1 = this.dateString1.replace(/ /g,'')
      if (dateRegExp.test(this.dateString1)) {
        let date = new Date(this.dateString1)
        if (typeof this.second === 'undefined') {
          this.first = date
          this.firstInputError = false
        } else {
          if (this.second.getTime() >= date.getTime()) {
            this.first = date
            this.firstInputError = false
          } else {
            this.first = undefined
            this.firstInputError = true
          }
        }

      } else {
        this.first = undefined
        this.firstInputError = true
      }
    },
    onFinishSecond () {
      const dateRegExp = new RegExp(/^([1-9]|1[0-2])\/([1-9]|[12][0-9]|3[01])\/[0-9]{4}$/)
      this.dateString2 = this.dateString2.replace(/ /g,'')
      if (dateRegExp.test(this.dateString2)) {
        let date = new Date(this.dateString2)
        if (typeof this.first === 'undefined') {
          this.second = date
          this.secondInputError = false
        } else {
          if (this.first.getTime() <= date.getTime()) {
            this.second = date
            this.secondInputError = false
          } else {
            this.secondInputError = true
          }
        }

      } else {
        this.secondInputError = true
      }
    },
    checkRanges () {
      var highlighted = {}
      if (typeof this.first === 'undefined') {
        if (typeof this.second === 'undefined') {
          highlighted = {
            dates: []
          }
        } else {
          highlighted = {
            customPredictor: (date) => {
              if (date.getTime() <= this.second.getTime()) {
                return true
              }
            }
          }
        }
      } else {
        if (typeof this.second === 'undefined') {
          highlighted = {
            customPredictor: (date) => {
              if (date.getTime() >= this.first.getTime()) {
                return true
              }
            }
          }
        } else {
          highlighted = {
            from: new Date(this.first.getFullYear(), this.first.getMonth(), this.first.getDate()),
            to: this.second
          }
        }
      }

      // let highlighted = {
      //   customPredictor: (date) => {
      //     if (this.first == undefined) {
      //       if (this.second == undefined) {

      //       } else {
      //         if (date.getTime() <= this.second.getTime()) {
      //           return true
      //         }
      //       }
      //     } else {
      //       if (this.second == undefined) {
      //         if (date.getTime() >= this.first.getTime()) {
      //           return true
      //         }
      //       } else {
      //         if (date.getTime() >= this.first.getTime() && date.getTime() <= this.second.getTime()) {
      //           return true
      //         }
      //       }
      //     }

      //   }
      // }

      return highlighted
    },
    disabledFirstDates () {
      let disabledDates = {
        from: this.second
      }
      return disabledDates
    },
    disabledSecondDates() {
      if (typeof this.first === 'undefined') {
        return disabledDates = {}
      }
      let disabledDates = {
        to: new Date(this.first.getFullYear(), this.first.getMonth(), this.first.getDate())
      }
      return disabledDates
    },
    getDateString (date) {
      if (typeof date === 'undefined') {
        return ''
      }
      date = new Date(date)
      let month = ' ' + (date.getMonth() + 1)
      let day = '' + date.getDate(0)
      let year = date.getFullYear()

      return month + '/' + day + '/' + year
    },
    selectFirst (val) {
      this.firstInputError = false
      let newDate = this.formatDate(val)
      let selectedDate = this.formatDate(this.first)

      if (typeof this.first !== 'undefined' && newDate === selectedDate) {
        this.first = undefined
        const selectedElement = document.querySelector('span.highlight-end')
        this.$nextTick(() => {
          selectedElement.classList.add('highlight-end')
        })
      } else {
        this.first = val
        this.$nextTick(() => {
          const selectedElement = document.querySelector('span.selected')
          if (!selectedElement.classList.contains('highlight-start'))
            selectedElement.classList.add('highlight-start')
        })
      }

      this.dateString1 = this.getDateString(this.first)
      if (typeof this.first === 'undefined' && typeof this.second === 'undefined') {
        this.select('All Time')
      } else {
        this.select('Fixed Dates')
      }
    },
    selectSecond (val) {
      this.secondInputError = false

      let newDate = this.formatDate(val)
      let selectedDate = this.formatDate(this.second)

      if (typeof this.second !== 'undefined' && newDate === selectedDate) {
        this.second = undefined
        const selectedElement = document.querySelector('span.highlight-start')
        this.$nextTick(() => {
          selectedElement.classList.add('highlight-start')
        })
      } else {
        this.second = val
      }

      this.dateString2 = this.getDateString(this.second)
      if (typeof this.first === 'undefined' && typeof this.second === 'undefined') {
        this.select('All Time')
      } else {
        this.select('Fixed Dates')
      }

    },
    formatDate (date) {
      if (typeof date === 'undefined') return ''
      let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear()

      if (month.length < 2) month = '0' + month
      if (day.length < 2) day = '0' + day

      return [year, month, day].join('-')
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
      if (strRange === 'Last Week') {
        this.first = this.getFirstDateOfLastWeek()
        this.second = this.getLastDateOfLastWeek()
      }
      if (strRange === 'This Month') {
        let d = new Date()
        this.first = new Date(d.getFullYear(), d.getMonth(), 1)
        this.second = new Date(d.getFullYear(), d.getMonth() + 1, 0)
      }
      if (strRange === 'Last Month') {
        let d = new Date()
        this.first = new Date(d.getFullYear(), d.getMonth() - 1, 1)
        this.second = new Date(d.getFullYear(), d.getMonth(), 0)
      }
      if (strRange === 'All Time') {
        this.first = undefined
        this.second = undefined
      }
      if (strRange === 'Fixed Dates') {
      }

      if (typeof this.first === 'undefined') {
        this.dateString1 = ''
      } else {
        this.dateString1 = this.getDateString(this.first)
      }
      if (typeof this.second === 'undefined') {
        this.dateString2 = ''
      } else {
        this.dateString2 = this.getDateString(this.second)
      }

    },
    getFirstDateOfThisWeek() {
      let d = new Date();
      let day = d.getDay()
      let diff = d.getDate() - day + (day === 0 ? -7 : 0)
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
