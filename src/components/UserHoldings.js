import React, { useState, useEffect } from 'react';
import { useMoralis, useMoralisCloudFunction } from 'react-moralis';
import BigNumber from 'bignumber.js';
import { Row, Col } from 'react-bootstrap';
import ethereum_address from 'ethereum-address';

const UserHoldings = () => {
  const { authenticate, isAuthenticated, user, logout } = useMoralis();
  const [ address, setAddress ] = useState('');
  const [ totalRealized, setTotalRealized ] = useState(0);
  const [ totalEarned, setTotalEarned ] = useState(0);
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
        let realised = new BigNumber(data.totalShares.totalRealised);
        setTotalRealized(realised.shiftedBy(-17).toNumber().toFixed(2));
        setTotalExcluded(pending.shiftedBy(-17).toNumber().toFixed(2));
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
      }
    },
    [ isAuthenticated ]
  );

  if (isAuthenticated) {
    return (
      <div>
        <h1>User Adddress:</h1>
        <h1>{user.get('ethAddress')}</h1>
      </div>
    );
  } else {
    return (
      <Row>
        <Row>
          <Col>
            <input
              type="text"
              onChange={(e) => {
                checkAddress(e.target.value);
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <h1>Total Earned:</h1>
            <h1>${totalRealized}</h1>
          </Col>
          <Col>
            <h1>Reward Not Claimed:</h1>
            <h1>${totalExcluded}</h1>
          </Col>
        </Row>
      </Row>
    );
  }
};

export default UserHoldings;
