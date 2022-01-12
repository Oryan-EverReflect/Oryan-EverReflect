import React, { useState, useEffect } from 'react';
import '../App.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useMoralis } from 'react-moralis';
import ethereum_address from 'ethereum-address';

// https://eth-mainnet.alchemyapi.io/v2/
function App() {
  const [ address, setAddress ] = useState('');
  const { authenticate, isAuthenticated, user, logout } = useMoralis();
  const [ totalAmount, setTotalAmount ] = useState(0);
  const [ marketCap, setMarketCap ] = useState(150000);
  const [ dailyVolume, setDailyVolume ] = useState(50000);
  const [ dailyReward, setDailyRewards ] = useState(0);
  const [ monthlyRewards, setMonthlyRewards ] = useState(0);
  const [ yearlyRewards, setYearlyRewards ] = useState(0);
  const [ totalValue, setTotalValue ] = useState(0);
  const [ currentPrice, setCurrentPrice ] = useState(0);
  const [ circulatingSupply, setCirculatingSupply ] = useState(500000000000000);

  const checkAddress = (address) => {
    if (ethereum_address.isAddress(address)) {
      console.log(`valid`);
      setAddress(address);
    } else {
      console.log(`invalid`);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      // startIt();
    }, 1000);
  }, []);

  const unsentReflection = async (address) => {
    // console.log(amt);
  };

  useEffect(
    () => {
      console.log(dailyReward);
    },
    [ dailyReward ]
  );

  const calculateDailyReward = () => {
    var price = marketCap / circulatingSupply;
    var yourPct = totalAmount / circulatingSupply;
    var yourDailyReflections = dailyVolume * 0.06 * yourPct;
    var yourMonthlyReflections = yourDailyReflections * 365 / 12;
    var yourYearlyReflections = yourMonthlyReflections * 12;
    var totalValue = totalAmount * price;

    setYearlyRewards(yourYearlyReflections);
    setMonthlyRewards(yourMonthlyReflections);
    setTotalValue(totalValue);
    setCurrentPrice(price);

    console.log(
      `Daily:${yourDailyReflections} Monthly:${yourMonthlyReflections} Yearly:${yourYearlyReflections} Total Value:${totalValue}`
    );
    setDailyRewards(yourDailyReflections);
    // setDailyRewards(total);
  };

  return (
    <Container>
      <Row style={{ marginBottom: '50px' }}>
        <Col style={{ textAlign: 'center' }}>
          <h1 style={{ marginTop: '30px' }}>EverReflect Reward Calculator</h1>
        </Col>
      </Row>
      <Form>
        <Row>
          <Col md={3} sm={1}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Total Holding:</Form.Label>
              <Form.Text />
              <Form.Control
                type="number"
                onChange={(e) => setTotalAmount(e.target.value)}
                placeholder="Enter Bankers Dream Amount"
              />
              {/* <option value={10000000}>10 Million</option>
                <option value={25000000}>25 Million</option>
                <option value={50000000}>50 Million</option>
                <option value={75000000}>75 Million</option>
                <option value={100000000}>100 Million</option>
                <option value={250000000}>250 Million</option>
                <option value={500000000}>500 Million</option>
                <option value={1000000000}>1 Billion</option>
                <option value={10000000000}>10 Billion</option>
                <option value={25000000000}>25 Billion</option>
                <option value={50000000000}>50 Billion</option>
                <option value={100000000000}>100 Billion</option>
                <option value={250000000000}>250 Billion</option>
                <option value={500000000000}>500 Billion</option>
                <option value={1000000000000}>1 Trillion</option>
              </Form.Select> */}
            </Form.Group>
          </Col>
          <Col md={3} sm={1}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Market Cap:</Form.Label>
              <Form.Select onChange={(e) => setMarketCap(e.target.value)}>
                <option selected value={150000}>
                  150 Thousand
                </option>
                <option value={250000}>250 Thousand</option>
                <option value={500000}>500 Thousand</option>
                <option value={1000000}>1 Million</option>
                <option value={2000000}>2 Million</option>
                <option value={3000000}>3 Million</option>
                <option value={4000000}>4 Million</option>
                <option value={5000000}>5 Million</option>
                <option value={10000000}>10 Million</option>
                <option value={25000000}>25 Million</option>
                <option value={50000000}>50 Million</option>
                <option value={75000000}>75 Million</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={3} sm={1}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Daily Volume:</Form.Label>
              <Form.Select onChange={(e) => setDailyVolume(e.target.value)}>
                <option selected value={50000}>
                  50 Thousand
                </option>
                <option value={100000}>100 Thousand</option>
                <option value={150000}>150 Thousand</option>
                <option value={250000}>250 Thousand</option>
                <option value={500000}>500 Thousand</option>
                <option value={1000000}>1 Million</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={3} sm={1}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Circulating Supply:</Form.Label>
              <Form.Select onChange={(e) => setCirculatingSupply(e.target.value)}>
                <option value={1000000000000}>1 Trillion</option>
                <option value={10000000000000}>10 Trillion</option>
                <option value={25000000000000}>25 Trillion</option>
                <option value={35000000000000}>35 Trillion</option>
                <option value={50000000000000}>50 Trillion</option>
                <option value={75000000000000}>75 Trillion</option>
                <option value={100000000000000}>100 Trillion</option>
                <option value={150000000000000}>150 Trillion</option>
                <option value={200000000000000}>200 Trillion</option>
                <option value={250000000000000}>250 Trillion</option>
                <option value={300000000000000}>300 Trillion</option>
                <option selected value={500000000000000}>
                  500 Trillion
                </option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Form>

      <br />
      <Row style={{ textAlign: 'center' }}>
        <Col md={4} sm={1} style={{ border: '1px solid #DCDCDC' }}>
          <h1>Daily Reflections:</h1>
          <h1>${dailyReward.toFixed(4)}</h1>
        </Col>
        <Col md={4} sm={1} style={{ border: '1px solid #DCDCDC' }}>
          <h1>Monthly Reflections:</h1>
          <h1>${monthlyRewards.toFixed(2)}</h1>
        </Col>
        <Col md={4} sm={1} style={{ border: '1px solid #DCDCDC' }}>
          <h1>Yearly Reflections:</h1>
          <h1>${yearlyRewards.toFixed(2)}</h1>
        </Col>
      </Row>
      <Row style={{ textAlign: 'center' }}>
        <Col md={6} sm={1} style={{ border: '1px solid #DCDCDC' }}>
          <h1>Price:</h1>
          <h1>${currentPrice.toFixed(10)}</h1>
        </Col>
        <Col md={6} sm={1} style={{ border: '1px solid #DCDCDC' }}>
          <h1>Total:</h1>
          <h1>${totalValue.toFixed(2)}</h1>
        </Col>
      </Row>
      <Row style={{ marginTop: '30px' }}>
        <Button
          onClick={() => {
            calculateDailyReward();
          }}
        >
          Calculate
        </Button>
      </Row>
    </Container>
  );
}

export default App;
