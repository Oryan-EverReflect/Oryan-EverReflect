import React from 'react';
import { useMoralis, useMoralisCloudFunction, useWeb3ExecuteFunction } from 'react-moralis';
import reflections from './reflections.json';
import { Button } from 'react-bootstrap';

const ClaimRewards = () => {
  const { authenticate, isAuthenticated, user, logout } = useMoralis();
  const { data, error, fetch, isFetching, isLoading } = useWeb3ExecuteFunction({
    contractAddress: '0x3C2e501B08CF5C16061468c96b19b32bae451dA3',
    functionName: 'claim',
    abi: reflections
  });
  // fetch();
  return (
    <div stlye={{ width: '100%' }}>
      <Button
        style={{ width: '200px', marginLeft: 'auto', marginRight: 'auto', display: 'block', marginTop: '20px' }}
        onClick={() => {
          fetch();
          console.log('claim');
        }}
      >
        Claim Reward
      </Button>
    </div>
  );
};

export default ClaimRewards;
