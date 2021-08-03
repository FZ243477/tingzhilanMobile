import Vue from 'vue'
Vue.filter('filterTime', function (value) {
    if (!value) {
        return ''
    }

    // value 不是时间格式 时：分： 秒
    if (value.indexOf(':') === -1) {
        return value
    }

    let result = ''
    const arr = value.split(':')
    // 对小时、分钟、0秒数 补0
    if (parseInt(arr[0]) < 10) {
        result = '0' + arr[0]
    } else {
        result = arr[0]
    }

    if (parseInt(arr[1]) < 10) {
        result = result + ':0' + arr[1]
    } else {
        result = result + ':' + arr[1]
    }

    if (parseInt(arr[2]) < 10) {
        result = result + ':0' + arr[2]
    } else {
        result = result + ':' + arr[2]
    }
    return result
})
