import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    goods: null,
    address: null
  },
  mutations: {
    setGoods(state, goods) {
      state.goods = goods;
    },
    setAddress(state, address) {
      state.address = address;
    }
  },
  getters: {
    getGoods(state) {
      return state.goods;
    },
    getAddress(state) {
      return state.address;
    }
  }
});

export default store;