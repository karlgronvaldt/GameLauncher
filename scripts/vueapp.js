Vue.component('gamecardmodal', {
	template: '#gameCardModal',

	// data: function() {
	// 	gameModalTitle = this._title;
	// },

	// events: {
	// 	'receive': function(title) {
	// 		let _title = title;
	// 	}
	// }, ???????????????????????????????????

});

Vue.component('gamecard', {
	template: '#gameCard',
	props: ['subject', 'image'],

	data: function() {
		return {
			gameModalTitle: 'lortetitel',
			gameModalDesc:  'dette er en skrald beskrivelse'};
	},

	methods: {
		storeGameInfo: function() {
			$('#viewGameModal').modal('show');
			this.$dispatch('fetch-info', this.gameModalTitle);
		},
	},
});


// FILTERS
Vue.filter('searchTitle', function (element, title) {

	let ptn;
	let result;

	if (!title){
		return element;
	}

	title = title.trim().toLowerCase();
	
	ptn = new RegExp(title.split('').join('.*')+'.*', 'i');

	return element.filter(function (item) {
		
		result = item.display_name.match(ptn);
		
		if (item.display_name.toLowerCase().indexOf(title) !== -1) {
			return item;
		}
		
		return result;
		
	})
})

Vue.filter('genres', function (element, genre) {
	
	if (!genre) {
		return element;
	}
	
	return element.filter(function (item) {
		for (e of item.genres) {
			if (e.name == genre) {
				return item
			}
		}
	})
})

Vue.filter('modes', function (element, mode) {
	
	if(!mode){
		return element;
	}
	
	return element.filter(function (item) {
		for (e of item.modes) {
			if (e.name == mode) {
				return item;
			}
		}
	})
})

Vue.filter('visible', function (element) {
	
	return element.filter(function (item) {
		if (item.visible) {
			return item;
		}
	})
})


// MAIN VUE APP
let vm = new Vue({
	el: 'body',
	data: {
		cursor: 0,
		cursorLength: 0,
		btnModeName: 'Mode',
		btnGenreName: 'Genre',
		searchQuery: '',
        gameTitle: '',
	  	selectedMode: '',
	  	selectedGenre: '',
	  	genres: [
			{ text: 'Genre', value: '' },
			{ text: 'Real-time strategy', value: 'RTS' },
			{ text: 'Role Playing Game', value: 'RPG' },
			{ text: 'First-person shooter', value: 'FPS' },
			{ text: 'Simulation', value: 'Simulation' },
			{ text: 'Sport', value: 'Sport' },
			{ text: 'Action', value: 'Action' },
			{ text: 'Turn-based strategy', value: 'TBS' },
			{ text: 'Racer', value: 'Racer' },
			{ text: 'Casual', value: 'Casual' },
			{ text: 'Adventure', value: 'Adventure' },
			{ text: 'Free-to-Play', value: 'F2P' },
			{ text: 'Indie', value: 'Indie' },
			{ text: 'Strategy', value: 'Strategy' },
			{ text: 'Platform', value: 'Platform' },
			{ text: 'Open world', value: 'Open World' },
			{ text: 'Tower Defence', value: 'Tower Defence' },
			{ text: 'Horror', value: 'Horror' },
			{ text: 'Shooter', value: 'Shooter' },
			{ text: 'Puzzle', value: 'Puzzle' },
			{ text: 'Hack & Slash', value: 'Hack & Slash' },
			{ text: 'Program', value: 'Programs' },
			],
		modes: [
			{ text: 'Mode', value: '', icon: 'fa fa-info'},
			{ text: 'Multiplayer', value: 'Multiplayer', icon: 'fa fa-user-plus'},
			{ text: 'Singleplayer', value: 'Single player', icon: 'fa fa-user'},
			{ text: 'Cooperation', value: 'CO-OP', icon: 'fa fa-users'},
			{ text: 'MMORPG', value: 'MMORPG', icon: 'fa fa-arrows'},
			],
		gameData: dsinfo, //dsinfo = gamelist.js
    },

	events: {
		'fetch-info': function(title) {
			console.log('parent: ' + title);
			// this.$broadcast('receive', this.gameModalTitle); ????
		},
	},

	methods: {
		// cursorDown: function () {
		// 	if (this.cursor !== this.cursorLength) {
		// 		this.cursor++;
		// 		document.getElementById("search").focus();
		// 	}
		// },
		// cursorUp: function () {
		// 	if (this.cursor !== 0) {
		// 		this.cursor--;
		// 		document.getElementById("search").focus();
		// 	}
		// },
		setGenre: function (genre) {
			this.selectedGenre = genre.value;
			this.btnGenreName = genre.text ? genre.text : 'Genre';
		},
		setMode: function (mode) {
			this.selectedMode = mode.value;
			this.btnModeName = mode.text ? mode.text : 'Mode';
		},
		reset: function () {
			this.selectedMode = '';
			this.btnModeName = 'Mode';
			
			this.selectedGenre = '';
			this.btnGenreName = 'Genre';
			
			this.searchQuery = '';
		},
	}
})