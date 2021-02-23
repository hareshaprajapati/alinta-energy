import React, { useEffect, useState } from 'react';
import { initialCustomerState } from '../App';
import { Customer } from '../Model/Customer';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Input from '../Input/Input';

interface IProps {
  editing: boolean;
  resetEditing: () => void;
  currentCustomer: Customer;
  updateCustomer: (updatedCustomer: Customer) => void;
}

const AddCustomer = (props: IProps) => {

  const { updateCustomer, currentCustomer, editing, resetEditing } = props;

  const [customer, setCustomer] = useState(currentCustomer);

  const cancelEditing = () => {
    resetEditing();
  }

  useEffect(() => {
    setCustomer(currentCustomer);
  }, [currentCustomer]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setCustomer({ ...customer, [name]: name === "dob" ? new Date(value) : value })
  }

  const saveEnabled = !customer?.fName || !customer?.lName || !customer?.dob;

  const onSaveCustomer = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    if (saveEnabled) return;
    updateCustomer(customer)
    setCustomer(initialCustomerState)
  }

  const setDOB = (date: Date) => {
    setCustomer({ ...customer, "dob": date });
  }
  return (
    <div>
      <Input
        label="First Name"
        type="text"
        value={customer.fName}
        name="fName"
        onChange={handleInputChange} />
      <Input
        label="Last Name"
        type="text"
        value={customer.lName}
        name="lName"
        onChange={handleInputChange} />

      <div className="input-container">
        <label className="label">Date Of Birth</label>
        <DatePicker selected={customer.dob} onChange={setDOB}
          className={`input-text`} />
      </div>

      <button
        onClick={onSaveCustomer}
        className={`btn ${saveEnabled ? 'btn-disabled' : ''}`}
      >{editing ? 'Update' : 'Save'}</button>
      {editing && <button onClick={cancelEditing} className="btn btn-delete">Cancel</button>}
    </div>
  )
}

export default AddCustomer;
