const user = {
    async findUsers(){
        return new Promise(async(resolve,reject)=>{
            resolve(1)
        })
    }
}

module.exports = user