import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';
import { Customer } from './../Model/Customer';

export type ConfirmationType = 'Yes' | 'No';

interface IProps {
  customer: Customer | undefined;
  handleClose: (value: ConfirmationType) => void;
}

const AlertDialog = (props: IProps) => {

  const { customer, handleClose } = props;

  const onAccept = () => {
    handleClose('Yes');
  }

  const onReject = () => {
    handleClose('No');
  }

  return (
    <Dialog
      open={true}
      onClose={onReject}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{`Are you sure to delete ${customer?.fName} ${customer?.lName} ?`}</DialogTitle>
      <DialogActions>
        <button onClick={onReject} className="btn">
          No
          </button>
        <button onClick={onAccept} className="btn btn-delete" autoFocus>
          Yes
          </button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;