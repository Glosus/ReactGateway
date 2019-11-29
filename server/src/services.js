const fetch = require('node-fetch')

const services = {
  itemService :'185.251.91.187:1824', //Ilya
  orderService : '185.251.91.187:1809', //Polina
  paymentService : '185.251.91.187:1810' //Dima
}

const serviceRequest = async (service, endpoint, method, body = null) => {
  console.log(services[service]);
  console.log(endpoint);
  console.log(method);
  console.log(body);
  const apiAnswer = await fetch('http://' + services[service] + endpoint, {
    method: method,
    headers: {'Content-Type': 'text/html; charset=utf-8'},
    body: body
  });
  console.log(apiAnswer);
  const apiAnswerInJSON = await apiAnswer.json();
  return apiAnswerInJSON;
}

module.exports.openWeather = serviceRequest;
