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
        appId: '2016072701673790',
        partner: '2088311594324396',
        seller: 'rebaccoyu@163.com',
        _input_charset: 'UTF-8',
        sign_type: 'RSA',
        sign: 'OVdYobjDHCWRlCJV68ZmAzZhTbtzXSZCm1fbZiI6B2Agh6CL7k%2BHuYI33hfZR1ERRNX%2BPJMCozQR8hfDGhZL3OEY%2FSwicO%2F6F2dH8hTyxMyAm6rsZmtWz81RoGr0JmakeOzQUVyY7BZQi1rucHiGc058G8btLFNmYniO%2FOBVbYk%3D',
        out_trade_no: '771609009093',
        subject: 'Test',
        body: 'test',
        price: '0.01',
        notifyUrl: 'https://www.alipay.com'
      }
    }
  ];

  var details = {
    total: {label: 'Donation', amount: {currency: 'RMB', value: '0.01'}},
    displayItems: [
      {
        label: 'Original donation amount',
        amount: {currency: 'RMB', value: '65.00'}
      },
      {
        label: 'Friends and family discount',
        amount: {currency: 'RMB', value: '-64.99'}
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

function onPayClicked() {
  error("hi 1 ");
  $(".ajax.load").load("http://www.cnblogs.com/QLeelulu/archive/2008/03/30/1130270.html .post",
    function (responseText, textStatus, XMLHttpRequest){
    this;//在这里this指向的是当前的DOM对象，即$(".ajax.load")[0]  
    //alert(responseText);//请求返回的内容
    //alert(textStatus);//请求状态：success，error
    //alert(XMLHttpRequest);//XMLHttpRequest对象
  });
  ajax({
    url: "https://www.baidu.com",
  }).done(function() {
  // do what you want  
    error("hi here success ");
  });
  error("hi 2 ");
}
