// import React from "react";
// // nodejs library that concatenates classes
// import classnames from "classnames";
// // reactstrap components
// import {
//   Button,
//   Card,
//   CardHeader,
//   CardBody,
//   FormGroup,
//   Form,
//   Input,
//   InputGroupAddon,
//   InputGroupText,
//   InputGroup,
//   Modal,
//   Row,
//   Col
// } from "reactstrap";

// import Post from "../post";

// class Modals extends React.Component {
//   state = {};
//   toggleModal = state => {
//     this.setState({
//       [state]: !this.state[state]
//     });
//   };
//   render() {
//     return (
//       <>
//         <Row>
//           <Col md="4">
//             <Button
//               block
//               className="mb-3"
//               color="primary"
//               type="button"
//               onClick={() => this.toggleModal("defaultModal")}
//             >
//               Default
//             </Button>
//             <Modal
//               className="modal-dialog-centered"
//               isOpen={this.state.defaultModal}
//               toggle={() => this.toggleModal("defaultModal")}
//             >
//               {/* <div className="modal-header">
//                 <h6 className="modal-title" id="modal-title-default">
//                   Type your modal title
//                 </h6>
//                 <button
//                   aria-label="Close"
//                   className="close"
//                   data-dismiss="modal"
//                   type="button"
//                   onClick={() => this.toggleModal("defaultModal")}
//                 >
//                   <span aria-hidden={true}>×</span>
//                 </button>
//               </div> */}
//               <div className="modal-body">
//                 <Post />
//               </div>
//               <div className="modal-footer">
//                 <Button
//                   className="ml-auto"
//                   color="link"
//                   data-dismiss="modal"
//                   type="button"
//                   onClick={() => this.toggleModal("defaultModal")}
//                 >
//                   Close
//                 </Button>
//               </div>
//             </Modal>
//           </Col>
//         </Row>
//       </>
//     );
//   }
// }

// export default Modals;
