import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUser, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons'

library.add(faUser, faTimes, faCheck)

export default (app) => {
  app.component('font-awesome-icon', FontAwesomeIcon)
}
