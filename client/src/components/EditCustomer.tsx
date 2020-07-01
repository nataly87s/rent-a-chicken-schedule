import React, {Dispatch, SetStateAction, useState} from 'react';
import CustomersClient, {Customer} from '../clients/CustomersClient';

const customersClient = new CustomersClient();

type CustomerEditorProps = Omit<Customer, 'id'> & {
    setFirstName: Dispatch<SetStateAction<string>>;
    setLastName: Dispatch<SetStateAction<string>>;
    setPhoneNumber: Dispatch<SetStateAction<string>>;
    setEmail: Dispatch<SetStateAction<string>>;
    setNotes: Dispatch<SetStateAction<string>>;
    onSave: () => void;
};

const CustomerEditor = ({
    firstName,
    lastName,
    phoneNumber,
    email,
    notes,
    setFirstName,
    setLastName,
    setPhoneNumber,
    setEmail,
    setNotes,
    onSave,
}: CustomerEditorProps) => (
    <div style={{border: '1px solid black'}}>
        <p>
            <label>First Name</label>
            <input onChange={(e) => setFirstName(e.target.value)} value={firstName} />
        </p>
        <p>
            <label>Last Name</label>
            <input onChange={(e) => setLastName(e.target.value)} value={lastName} />
        </p>
        <p>
            <label>Phone Number</label>
            <input onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} />
        </p>
        <p>
            <label>Email</label>
            <input onChange={(e) => setEmail(e.target.value)} value={email} />
        </p>
        <p>
            <label>Notes</label>
            <textarea onChange={(e) => setNotes(e.target.value)} value={notes} />
        </p>
        <p>
            <button onClick={onSave}>Save</button>
        </p>
    </div>
);

export type AddCustomerProps = {
    onSave: (customer: Customer) => void;
};

export const AddCustomer = ({onSave}: AddCustomerProps) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [notes, setNotes] = useState('');

    const performSave = async () => {
        const customer = await customersClient.put({firstName, lastName, phoneNumber, email, notes});
        setFirstName('');
        setLastName('');
        setPhoneNumber('');
        setEmail('');
        setNotes('');
        onSave(customer);
    };

    return (
        <CustomerEditor
            firstName={firstName}
            lastName={lastName}
            phoneNumber={phoneNumber}
            email={email}
            notes={notes}
            setFirstName={setFirstName}
            setLastName={setLastName}
            setPhoneNumber={setPhoneNumber}
            setEmail={setEmail}
            setNotes={setNotes}
            onSave={performSave}
        />
    );
};

// export type EditCustomerProps = {
//     customer?: Customer;
//     onSave: (customer: Omit<Customer, 'id'>) => void;
//     onCancel: () => void;
// };
//
// const EditCustomer = ({customer, onSave, onCancel}: EditCustomerProps) => {
//     const [firstName, setFirstName] = useState('');
//     const [lastName, setLastName] = useState('');
//     const [phoneNumber, setPhoneNumber] = useState('');
//     const [email, setEmail] = useState('');
//     const [notes, setNotes] = useState('');
//
//     useEffect(() => {
//         setFirstName(customer?.firstName || '');
//         setLastName(customer?.lastName || '');
//         setPhoneNumber(customer?.phoneNumber || '');
//         setEmail(customer?.email || '');
//         setNotes(customer?.notes || '');
//     }, [customer]);
//
//     return (
//         <div>
//             <p>
//                 <label htmlFor={'customer-first-name'}>First Name</label>
//                 <input id={'customer-first-name'} onChange={(e) => setFirstName(e.target.value)} value={firstName} />
//             </p>
//             <p>
//                 <label htmlFor={'customer-last-name'}>Last Name</label>
//                 <input id={'customer-last-name'} onChange={(e) => setLastName(e.target.value)} value={lastName} />
//             </p>
//             <p>
//                 <label htmlFor={'customer-phone-number'}>Phone Number</label>
//                 <input
//                     id={'customer-phone-number'}
//                     onChange={(e) => setPhoneNumber(e.target.value)}
//                     value={phoneNumber}
//                 />
//             </p>
//             <p>
//                 <label htmlFor={'customer-email'}>Email</label>
//                 <input id={'customer-email'} onChange={(e) => setEmail(e.target.value)} value={email} />
//             </p>
//             <p>
//                 <label htmlFor={'customer-notes'}>Notes</label>
//                 <textarea id={'customer-notes'} onChange={(e) => setNotes(e.target.value)} value={notes} />
//             </p>
//             <p>
//                 <button onClick={() => onSave({firstName, lastName, phoneNumber, email, notes})}>Save</button>
//                 <button onClick={onCancel}>Cancel</button>
//             </p>
//         </div>
//     );
// };
