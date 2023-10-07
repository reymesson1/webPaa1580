const shopify = shopifyApi({
    apiKey: '9508c52b4d1637859eb607090f463cc2',
    apiSecretKey: '57b1d2854f711b20c919246951e76c83',
    scopes: ['read_products'],
    hostName: 'ngrok-tunnel-address',
});
  
  const app = express();
  