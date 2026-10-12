export default function hashGen(len : number) : string{
    let s : string = ""
    const str = "MDSKFMV98UT357H873H1dfmvoe3320394iut95092u10enpqqasmmvorih"
    const randomLen : number = str.length

    for(let i = 0; i < len; i++){
        s += str[Math.floor((Math.random()*randomLen))]!
    }
    return s
}