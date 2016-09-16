/* global done:false */
/* global error:false */
/* global PaymentRequest:true */

/**
 * Launches payment request for AliPay.
 */
function onBuyClicked() {  // eslint-disable-line no-unused-vars
  var supportedInstruments = [
    {
      // Browser downloads https://alipay.com/payment-app.json to verify
      // identity of the Android app that handles this payment.
      supportedMethods: ['https://raw.githubusercontent.com/cruise1008/cruise1008.github.io/master/pay'],
      data: {
        // Browser does not parse this data and passes it directly to AliPay app.
        partner: '2088501624560335',
        seller: 'alipayrisk10@alipay.com',
        _input_charset: 'UTF-8',
        sign_type: 'RSA',
        sign: 'a2OCtXa0yuzZlCmybruxpSjROFKZCnCTgD3ninv2MHDd0Wgjo5M6RGL3HeMGSyF2%2FPOOD95jkgdP7dEoQECEEnMCFO4bYJtcBge4VLA7jqi6zi2egKtSSYIF3CwrH4RpI3KM4OUT6jg95RFxZY%2B8KNNUduW2RDHiRh6HE%2B4UPIM%3D',
        out_trade_no: 'PARTNER_TRANS_ID_113',
        subject: 'Test Payment Demo',
        body: 'test',
        price: '0.01',
        notifyUrl: 'https://api.ddyc.com/car/alipay/notify/3.0'
      }
    }
  ];

  var details = {
    total: {label: 'Donation', amount: {currency: 'USD', value: '55.00'}},
    displayItems: [
      {
        label: 'Original donation amount',
        amount: {currency: 'USD', value: '65.00'}
      },
      {
        label: 'Friends and family discount',
        amount: {currency: 'USD', value: '-10.00'}
      }
    ]
  };

  if (!window.PaymentRequest) {
    error('This browser does not support web payments.');
    return;
  }



  try {
    var request = new PaymentRequest(supportedInstruments, details);
    request.show()
        .then(function(instrumentResponse) {
          window.setTimeout(function() {
            instrumentResponse.complete('success')
                .then(function() {
                  done('Thank you!', instrumentResponse);
                })
                .catch(function(err) {
                  error(err);
                });
          }, 2000);
        })
        .catch(function(err) {
          error(err);
        });
  } catch (e) {
    error('Developer mistake: \'' + e.message + '\'');
  }
}
