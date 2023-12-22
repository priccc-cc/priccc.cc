interface State {}

export const globalStore = defineStore('global', {
  state: (): State => ({}),
})
