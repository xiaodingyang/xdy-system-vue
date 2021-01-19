
const layout = {
	state: {
        theme: 'theme1', // 主题色
	},

	mutations: {
		SET_LAYOUT_THEME: (state, theme) => {
			state.theme = theme
        },

	},

	actions: {
		setTheme({ commit, state },theme) {
            document.body.className = theme
            commit('SET_LAYOUT_THEME',theme)
		},
	},
}

export default layout
