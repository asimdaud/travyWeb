// import React from "react";


// export default class postModal extends React.Component {
//   state = { isOpen: false };

//   handleShowDialog = () => {
//     this.setState({ isOpen: !this.state.isOpen });
//     console.log("Clicked");
//   };

//   render() {
//     return (
//       <div>
//         <img
//           className="small"
//           src={require("assets/img/brand/logo.png")}
//           onClick={this.handleShowDialog}
//           alt="no image"
//         />
//         {this.state.isOpen && (
//           <dialog
//             className="dialog"
//             style={{ position: "absolute" }}
//             open
//             onClick={this.handleShowDialog}
//           >
//             <img
//               className="image"
//               src={require("assets/img/brand/logo.png")}
//               onClick={this.handleShowDialog}
//               alt="no image"
//             />
//           </dialog>
//         )}
//       </div>
//     );
//   }
// }


// // const ModalPost = ({showM, handleClose})=> {

// //   this.state = {showM, handleClose} = this.props;
 
// //        const [modal, setModal] = useState(false);
 
// //        const toggle = () => setModal(!modal);
 
// //        return (
// //        <div>
// //          {/* <Button color="danger" onClick={toggle}>{buttonLabel}</Button> */}
// //          <Modal
// //          isOpen={showM}
// //          >
// //            <ModalHeader >Modal title</ModalHeader>
// //            <ModalBody>
// //    <Post/>
// //            </ModalBody>
// //            <ModalFooter>
// //              {/* <Button color="primary" onClick={toggle}>Do Something</Button>{' '} */}
// //              <Button color="secondary" onClick={handleClose}>Cancel</Button>
// //            </ModalFooter>
// //          </Modal>
// //        </div>
// //      );
 
// //    }
 