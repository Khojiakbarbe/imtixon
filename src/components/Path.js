
export default function () {
    let a = window.location.pathname.split('/')
    if(a[1].length){
        return +a[1]
    }else{
        return 1
    }
}