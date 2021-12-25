import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Signin from './Signup';

const ModalSignUp= (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
const Header=props.addadmin?(
  <p>Add an Admin</p>
):(
  <p>New To Maleda? Signup</p>
)
const destroy=props.destroy?(props.destroy):(toggle)
  return (
    <div>
      <Button color="btn-white" onClick={toggle}> {Header} 

      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>M2N</ModalHeader>
        <ModalBody>
        <Signin closer={destroy} lset={props.lset} addadmin={props.addadmin}
        comset={props.comset} setter={props.setter} setme={props.setme} from={props.from}/>
        </ModalBody>
        <ModalFooter>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalSignUp;