import Vue from 'vue'
import App from './components/App.vue'

const bus = new Vue()
Vue.prototype.$bus = bus


Vue.prototype.getMembreId = function() {
	try {
		let member = JSON.parse(localStorage.getItem('member'));
		return member._id;
	} catch(e) {
		return false;
	}
}

Vue.prototype.addToken = function() {
	try {
		let member = JSON.parse(localStorage.getItem('member'));
		return '?token='+member.token;
	} catch(e) {
		return false;
	}
}

let api_key = 'dcc6734b263f43ae9c030b3a5ec9a483';
let api_url = 'http://coop.api.netlor.fr/api/';

axios.apiGet = function(uri) {
	return axios.get(api_url+uri,{
		headers: { Authorization: "Token token="+api_key }
	});
}
axios.apiDelete = function(uri) {
	return axios.delete(api_url+uri,{
		headers: { Authorization: "Token token="+api_key }
	});
}
axios.apiPost = function(uri,parameters) {
	return axios.post(api_url+uri,parameters,{
		headers: { Authorization: "Token token="+api_key }
	})
}


let coop = false;
 new Vue({
  el: '#app',
  render: h => h(App)
});


