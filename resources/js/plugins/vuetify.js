import Vue from 'vue'
import Vuetify from 'vuetify'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(Vuetify)

const opts = {
    iconfont: 'mdi' // 'md' || 'mdi' || 'fa' || 'fa4'
  };

export default new Vuetify(opts)