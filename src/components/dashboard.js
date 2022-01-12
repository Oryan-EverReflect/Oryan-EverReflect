import React, { useState, useEffect } from 'react';
import { useMoralis, useMoralisCloudFunction } from 'react-moralis';
import Moralis from 'moralis';
import BigNumber from 'bignumber.js';
import { Row, Col, Container, Form } from 'react-bootstrap';
import ethereum_address from 'ethereum-address';
import TotalDistributed from './TotalDistributed';
import ClaimRewards from './claim';
import logo from '../assets/bankersdream.png';

const Dashboard = () => {
  const { authenticate, isAuthenticated, user, logout } = useMoralis();
  const [ address, setAddress ] = useState('');
  const [ totalRealized, setTotalRealized ] = useState(0);
  const [ totalExcluded, setTotalExcluded ] = useState(0);
  const { fetch, data, error, isLoading } = useMoralisCloudFunction(
    'getShares',
    {
      address: address
    },
    { autoFetch: false }
  );

  useEffect(
    () => {
      if (data) {
        // console.log(allowance);

        console.log(data);
        // console.log(sharesError);
        let pending = new BigNumber(data.unpaid);
        let realised = new BigNumber(data.paid[4]);
        setTotalRealized(realised.shiftedBy(-18).toNumber().toFixed(2));
        setTotalExcluded(pending.shiftedBy(-18).toNumber().toFixed(2));
      }
    },
    [ data ]
  );

  const getBalance = async () => {
    console.log(`getBalance:${address}`);
    await fetch();
  };

  const checkAddress = (address) => {
    if (ethereum_address.isAddress(address)) {
      console.log(`valid`);
      setAddress(address);
    } else {
      console.log(`invalid`);
    }
  };

  useEffect(
    () => {
      console.log(`getting balance for :${address}`);
      if (address) {
        getBalance();
      }
    },
    [ address ]
  );

  useEffect(
    () => {
      if (isAuthenticated) {
        setAddress(user.get('ethAddress'));
      } else {
        setAddress('');
        setTotalRealized('0');
        setTotalExcluded('0');
      }
    },
    [ isAuthenticated ]
  );

  return (
    <Container>
      <Row style={{ paddingLeft: '0', paddingRight: '0', margin: '0px', marginTop: '20px' }}>
        <Col>
          <Form>
            <Form.Group>
              <Form.Label>Wallet Address:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter wallet address"
                style={{ width: '100%', marginLeft: 'auto', marginRight: 'auto' }}
                value={address}
                onChange={(e) => {
                  checkAddress(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          <div style={{ width: '500px', marginLeft: 'auto', marginRight: 'auto' }}>
            <img src={logo} style={{ width: '75px', display: 'inline' }} />
            <h1
              style={{
                textAlign: 'center',
                marginTop: '20px',
                marginBottom: '20px',
                display: 'inline-block',
                marginLeft: 'auto',
                marginRight: 'auto'
              }}
            >
              Bankers Dream Rewards
            </h1>
          </div>
        </Col>
      </Row>
      <Row>
        <Col lg={4} style={{ border: '1px solid #DCDCDC', textAlign: 'center' }}>
          <h1>Total Earned:</h1>
          <h1>${totalRealized}</h1>
        </Col>
        <Col lg={4} style={{ border: '1px solid #DCDCDC', textAlign: 'center' }}>
          <h1>Reward Not Claimed:</h1>
          <h1>${totalExcluded}</h1>
        </Col>
        <Col lg={4} style={{ border: '1px solid #DCDCDC', textAlign: 'center' }}>
          <TotalDistributed />
        </Col>
      </Row>
      <Row>{isAuthenticated ? <ClaimRewards /> : null}</Row>
    </Container>
  );
};

export default Dashboard;
