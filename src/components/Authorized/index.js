import RenderAuthorized from './AuthorizedComp'
import { getAuthority } from './Authority'

let Authorized = RenderAuthorized(getAuthority()) // eslint-disable-line

// Reload the rights component
const reloadAuthorized = () => {
    Authorized = RenderAuthorized(getAuthority())
}

export { reloadAuthorized }
export default Authorized
