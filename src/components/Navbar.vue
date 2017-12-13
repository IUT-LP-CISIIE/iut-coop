<template>

	<nav id="navbar" class="navbar has-shadow">
	  <div id="specialShadow" class="bd-special-shadow"></div>

	  <div class="container">

	  <div class="navbar-brand">
	    <a class="navbar-item" href="/">
	      Co'op
	    </a>
	</div>
	    <div class="navbar-end">
	      <div class="navbar-item">
	        <div class="field is-grouped">
	          <p class="control">
	            <a class="bd-tw-button button" @click="$bus.$emit('toggle-afficher-creation-channel')">
				  <span class="icon">
					<i class="fa fa-plus"></i>
				  </span>
				  <span>
					Nouvelle conversation
				  </span>
				</a>

	          </p>
	        </div>
	      </div>
	    </div>
	  </div>

	  </div>
	</nav>
</template>


<script>

export default {
	name: 'navbar',
		data () {
			return {
			}
		}
	}
</script>