/* 
length refers to array length page of records
pagelimit refers to page limit to display records
*/
import React from 'react'
import { HashLink as Link } from 'react-router-hash-link';
 const Pagination=(props)=> {
    const {length,pagelimit,active,scroll}=props
    const page=(length,pagelimit)=>{
        return  length/pagelimit
      }
    const pager=(length,pagelimit)=>{
        var x=[],n=page(length,pagelimit)
        for(var i=0;i<n;i++){
           x.push(i+1)
        }
        let showpage=x.length<=1? [] : x
        return showpage
     }
     const pageclick=(p,pagelimit)=>{
        let end=p*pagelimit
        let start=end-pagelimit
      let  pageinfo={start,end,active:p}
    props.click(pageinfo)
    }
      const Paginate=()=>pager(length,pagelimit).map(p=>{
    
        return(
            p===active?(
              <li className="page-item active" key={p}
               onClick={()=>{pageclick(p,pagelimit)}}>
              <Link smooth to={scroll} className='page-link'>
                 {p}
              </Link>
                </li>
                  ):(
             <li className="page-item" key={p}
               onClick={()=>{pageclick(p,pagelimit)}}>
               <Link smooth to={scroll} className='page-link'>
             {p}
            </Link>
                  </li>
                  )
        )
    })
    return (
        <div className="col-lg-12 text-center bg-black">
     <nav aria-label="Page navigation example" className='bg-black text-center'>
     <ul className="pagination pagination justify-content-center">
        <Paginate/>
        </ul>
      </nav>     
    </div>
    )
}
export default Pagination