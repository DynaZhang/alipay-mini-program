Component({
  mixins: [],
  data: {
    
  },
  props: {
    txtOutCity: ''
  },
  methods: {
    chooseCity() {
      my.chooseCity({
        showLocatedCity: true,
        showHotCities: true,
        success: (res) => {
          this.setData({
            txtOutCity: res.city
          })
        }
      });
    }
  },
});
