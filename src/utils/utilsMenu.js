
const utilsMenu = {
    isUrl: path => {
        const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/
        return reg.test(path)
    },
    urlToList:url => {
        const urllist = url.split('/').filter(i => i)
        return urllist.map((urlItem, index) => {
            return `/${urllist.slice(0, index + 1).join('/')}`
        })
    }
}

module.exports = utilsMenu
