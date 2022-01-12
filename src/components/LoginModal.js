import React from 'react';
import { useMoralis } from 'react-moralis';
import { Modal, Button } from 'react-bootstrap';
import metamask from '../assets/metamask.png';
import walletconnect from '../assets/walletconnect5023.jpg';

const LoginModal = (props) => {
  const { authenticate, isAuthenticated, user, logout } = useMoralis();
  const { setModalShow } = props;
  return (
    <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Body>
        {/* <Button
          style={{ width: '100px', marginLeft: 'auto', marginRight: 'auto' }}
          onClick={() => {
            authenticate();
            setModalShow(false);
          }}
        >
          MetaMask
        </Button> */}
        <div
          onClick={() => {
            authenticate();
            setModalShow(false);
          }}
          style={{ textAlign: 'center', cursor: 'pointer' }}
        >
          <img style={{ width: '30%', marginLeft: 'auto', marginRight: 'auto', display: 'block' }} src={metamask} />
          <span style={{ color: 'black', textAlign: 'center' }}>MetaMask</span>
        </div>
        <hr style={{ backgroundColor: 'gray' }} />
        {/* <Button
          style={{ width: '100px', marginLeft: 'auto', marginRight: 'auto' }}
          onClick={() => {
            authenticate({ provider: 'walletconnect' });
            setModalShow(false);
          }}
        >
          Wallet Connect
        </Button> */}
        <div
          style={{ textAlign: 'center', cursor: 'pointer' }}
          onClick={() => {
            authenticate({ provider: 'walletconnect' });
            setModalShow(false);
          }}
        >
          <img
            style={{ width: '30%', marginLeft: 'auto', marginRight: 'auto', display: 'block' }}
            src={walletconnect}
          />
          <span>WalletConnect</span>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
