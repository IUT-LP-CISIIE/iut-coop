import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
	state : {
		member : false
	},
	mutations : {
		setMember(state,member) {
			state.member = member;
		},
		initialiseStore(state) {
			if(localStorage.getItem('store')) {
				this.replaceState(
					Object.assign(state, JSON.parse(localStorage.getItem('store')))
				);
			}
		}
	}
})
