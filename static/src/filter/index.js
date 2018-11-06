Vue.filter('time', (value, format) => {
    let time = new Date(value)
    console.log(time)
    switch(format.toLowerCase()){
        case 'y-m-d':
            return time.getFullYear() + '-'
            + (time.getMonth()+1) + '-'
            + time.getDate()
    }
})