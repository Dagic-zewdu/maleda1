import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Login from './Login';
import Comments from './../Video/Comments'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faEye,faThumbsUp,faComment } from '@fortawesome/free-solid-svg-icons'

const ModalLogin= (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  if(props.show==='navbar'){
  return (
    <div className="bg-black">
      <Button color="danger" onClick={toggle}>Login/signup</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader color="danger" toggle={toggle}>M2N</ModalHeader>
        <ModalBody>
        <Login dismiss={toggle} log={props.setter} setme={props.setme}/>
        </ModalBody>

      </Modal>
    </div>
  )}
 else if(props.show==='footer'){
    return (
      <div className="bg-dark">
        <Button color="danger" onClick={toggle}>Login/signup</Button>
        <Modal isOpen={modal} toggle={toggle} className={className}>
          <ModalHeader color="danger" toggle={toggle}>M2N</ModalHeader>
          <ModalBody>
          <Login dismiss={toggle} log={props.setter}/>
          </ModalBody>
  
        </Modal>
      </div>
    )}
  else if(props.show==='likebtn'){
    return(
      <div className="card-header bg-black text-center">
      <button className="btn mx-2 text-white" onClick={toggle}>
  <FontAwesomeIcon icon={faThumbsUp}/> 
                   {props.likes} 
               </button>
               <button className="btn mx-2 text-white">
             <FontAwesomeIcon icon={faEye}/>      
                   {props.views}
               </button>
                
               <button className="btn btn-outline-warning text-uppercase mx-2" data-toggle="collapse"
                data-target="#comment">
              <FontAwesomeIcon icon={faComment}/>
              {
                props.comlength
                } </button>
             <div className="text-center" id="comment">
                 <Comments name={props.name} file={props.file}  
name={props.name} comment={props.comment} log={props.log} setter={props.setter}
    cl={props.cl} type={props.type}
    savecomment={props.savecomment} 
       Editcomment={props.Editcomment}
       Editer={props.Editer}
       Deleter={props.Deleter}
       name={props.name}
       edit={props.edit} 
       form={props.form} 
       editer={props.editer}
       remove={props.remove}
       AllComments={props.AllComments}
       mycomment={props.mycomment}
       others={props.others}
       mycomm={props.mycomm}
       ccc={props.ccc}
       lset={props.lset}
       loading={props.loading}
       start ={props.start}
       end={props.end}
       commentpage={props.commentpage}
    />
                         
                 </div> 
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader color="danger" toggle={toggle}>M2N</ModalHeader>
        <ModalBody>
        <Login dismiss={toggle} lset={props.lset} from={props.from}/>
        </ModalBody>

      </Modal>
    </div>
    )
  }
  else if(props.show==='comments'){
    return(
      <div className="mx-2">
       <button className="btn text-warning" onClick={toggle}>
         login or sign-up inorder to comment
       </button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader color="danger" toggle={toggle}>M2N</ModalHeader>
        <ModalBody>
        <Login dismiss={toggle} lset={props.lset} comset={props.comset}/>
        </ModalBody>

      </Modal>
    </div>
    )
  }
}

export default ModalLogin;