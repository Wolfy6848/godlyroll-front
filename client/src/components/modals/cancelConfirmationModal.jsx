import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import coin from "../../assets/icons/coin.svg";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    outline: 0,
  },
  modalContent: {
    backgroundColor: '#14151D',
    border: '2px solid #282A3A',
    borderRadius: '10px',
    padding: theme.spacing(4),
    display: 'flex',
    color: "#FFF",
    flexDirection: 'column',
    alignItems: 'center',
    outline: 0,
  },
  modalButton: {
    margin: theme.spacing(1),
    width: '120px',
  },
  confirmButton: {
    backgroundColor: '#ff1b1b',
    color: 'white',
    fontFamily: 'Poppins',
    '&:hover': {
      backgroundColor: '#d91616',
    },
  },
  cancelButton: {
    backgroundColor: '#4A4D5E',
    color: 'white',
    fontFamily: 'Poppins',
    '&:hover': {
      backgroundColor: '#3A3D4E',
    },
  },
  itemImage: {
    width: "100px",
    height: "90px",
    objectFit: "contain",
    marginBottom: theme.spacing(2),
  },
  itemPrice: {
    display: "flex",
    alignItems: "center",
    gap: "0.3rem",
    fontSize: "16px",
    color: "white",
    marginBottom: theme.spacing(2),
  },
}));

const CancelConfirmationModal = ({ open, handleClose, item, onConfirm, type }) => {
  const classes = useStyles();

  if (!item) return null;

  return (
    <Modal
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.modalContent}>
          <h2>Confirm Cancellation</h2>
          {item.thumbnail && <img src={item.thumbnail} alt={item.display_name} className={classes.itemImage} />}
          <h3>{item.display_name || item}</h3>
          {item.price && (
            <div className={classes.itemPrice}>
              <img src={coin} alt="Coin" style={{height: 20, width: 20}} />
              <span style={{color: "#9B4FD5"}}>{item.price}</span>
            </div>
          )}
          <p>Are you sure you want to cancel this {type}?</p>
          <div>
            <Button
              className={`${classes.modalButton} ${classes.confirmButton}`}
              onClick={onConfirm}
            >
              Confirm
            </Button>
            <Button
              className={`${classes.modalButton} ${classes.cancelButton}`}
              onClick={handleClose}
            >
              Go Back
            </Button>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default CancelConfirmationModal;