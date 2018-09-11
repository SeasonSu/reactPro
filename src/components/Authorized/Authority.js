
const Authority = {
    getAuthority: () => {
        return localStorage.getItem('seasonAdmin-authority') || 'admin'
    },
    setAuthority: (authority) => {
         return localStorage.setItem('seasonAdmin-authority', authority)
    }
}

module.exports = Authority
