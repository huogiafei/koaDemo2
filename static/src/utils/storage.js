let storage = {
    set(key, val, expTime) {
        localStorage.setItem(key, JSON.stringify({
            data: val,
            expire: new Date().getTime() + expTime
        }))
    },
    get(key){
        let data = localStorage.getItem(key)
        if (!data || JSON.stringify(data) === "{}") {
            return ''
        } else {
            let obj = JSON.parse(data)
            if (new Date().getTime() > obj.expire) {
                localStorage.removeItem(key)
                return ''
            } else {
                return obj.data
            }
        }
    },
    remove(key) {
        localStorage.removeItem(key)
    }
}

module.exports = storage

