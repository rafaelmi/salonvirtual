export default {
  methods: {
    toMilSeparator (val) {
      let res = NaN
      if (!/\D/.test(val) && val) {
        res = (Math.round(val) + '.X')
          .replace(/\d(?=(\d{3})+\.)/g, '$&.').replace('.X', '')
      }
      return res
    },
    toMoney (val) {
      return (this.toMilSeparator(val) + ' Gs.')
    },
    toFacturaId (val) {
      const num = Number(val).toString().padStart(13, '0')
      return num.slice(0, 3) + '-' +
      num.slice(3, 6) + '-' +
      num.slice(-7)
    }
  }
}
