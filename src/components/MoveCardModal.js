// // src/components/MoveCardModal.js
// import React, { useState } from 'react';
// // import './MoveCardModal.css';

// const MoveCardModal = ({ lists, card, onClose, onMove }) => {
//   const [selectedListModal, setselectedListModalModal] = useState(card.listTitle);
//   const [position, setPosition] = useState(1);

//   const handleMove = () => {
//     onMove(card.id, selectedListModal, position);
//     onClose();
//   };

//   return (
//     <div className="modal-overlay-sub">
//       <div className="modal-content-sub">
//         <span className="close" onClick={onClose}>&times;</span>
//         <h2>Move Card</h2>
//         <div className="form-group">
//           <label>List</label>
//           <select value={selectedListModal} onChange={(e) => setselectedListModalModal(e.target.value)}>
//             {lists.map((list) => (
//               <option key={list} value={list}>{list}</option>
//             ))}
//           </select>
//         </div>
//         <div className="form-group">
//           <label>Position</label>
//           <input
//             type="number"
//             value={position}
//             min="1"
//             max={lists.length}
//             onChange={(e) => setPosition(e.target.value)}
//           />
//         </div>
//         <button className="move-button" onClick={handleMove}>Move</button>
//       </div>
//     </div>
//   );
// };

// export default MoveCardModal;
