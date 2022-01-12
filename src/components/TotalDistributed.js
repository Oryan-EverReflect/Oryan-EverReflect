import React, { useEffect, useState } from 'react';
import { useMoralisCloudFunction } from 'react-moralis';
import BigNumber from 'bignumber.js';
import { Col } from 'react-bootstrap';

const TotalDistributed = () => {
  const [ totalDistributed, setTotalDistributed ] = useState(0);
  const { data, error, isLoading } = useMoralisCloudFunction('getTotalDistributed');

  useEffect(
    () => {
      if (data) {
        console.log(data);
        let totalDistributed = new BigNumber(data.totalDistributed);
        setTotalDistributed(totalDistributed.shiftedBy(-18).toNumber().toFixed(2));
      }
    },
    [ data ]
  );

  return (
    <div>
      <h1>Total Distributed:</h1>
      <h1>${totalDistributed}</h1>
    </div>
  );
};

export default TotalDistributed;
