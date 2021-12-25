export const SearchEngine=(items,location,value)=>{
    /*
    const index=value.toLowerCase()
    const {length}=value
    */

    var d='YekeBere deha full movies'
    var i= d.toLowerCase()
    var newd=i.split(' ')
var first=newd[0]
  let slicer=first.length>=3?first.slice(0,3):first
    console.log(newd,slicer)
}
export const IndividualSearch=(items,value)=>{

}