import Vue from 'vue'
import App from './App.vue'
import {Bus} from './bus.js';

let api_key = 'dcc6734b263f43ae9c030b3a5ec9a483';
let api_url = 'http://coop.api.netlor.fr/api/';

axios.apiGet = function(uri,callback) {
	return axios.get(api_url+uri,{
		headers: { Authorization: "Token token="+api_key }
	});
}
axios.apiDelete = function(uri,callback) {
	return axios.delete(api_url+uri,{
		headers: { Authorization: "Token token="+api_key }
	});
}
axios.apiPost = function(uri,parameters) {
	return axios.post(api_url+uri,parameters,{
		headers: { Authorization: "Token token="+api_key }
	})}


let coop = false;
 new Vue({
  el: '#app',
  render: h => h(App)
});


