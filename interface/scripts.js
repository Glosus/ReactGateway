const gateway = 'http://localhost:3030'

const init = () => {
  const output = document.getElementById('output')
  output.innerHTML = '';

  document.getElementById('get_items').addEventListener('submit', async (event) => {
    event.preventDefault();
    const gatewayFetch = await fetch(gateway + '/api/warehouse/items', { method: 'GET' });
    const result = await gatewayFetch.json();
    output.innerHTML = JSON.stringify(result,undefined, 2);
  })

  document.getElementById('get_item_by_id').addEventListener('submit', async (event) => {
  	event.preventDefault();
  	const id = event.target['id'].value;
    const gatewayFetch = await fetch(gateway + '/api/warehouse/items/' + id, { method: 'GET' });
    const result = await gatewayFetch.json();
    output.innerHTML = JSON.stringify(result,undefined, 2);
  })

  document.getElementById('create_item').addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = event.target['name'].value;
    const amount = event.target['amount'].value;
    const gatewayFetch = await fetch(gateway + '/api/warehouse/items', {
      method: 'POST',
      headers: {'Content-Type': 'application/json;charset=utf-8'},
      body: JSON.stringify({'name' : name, 'amount' : amount })
    });
    const result = await gatewayFetch.json();
    output.innerHTML = JSON.stringify(result,undefined, 2);
  })

  document.getElementById('add_existing_items').addEventListener('submit', async (event) => {
    event.preventDefault();
    const id = event.target['id'].value;
    const amount = event.target['amount'].value;
    const gatewayFetch = await fetch(gateway + '/api/warehouse/items/'+id+'/addition/' + amount, { method: 'PUT' });
    const result = await gatewayFetch.json();
    output.innerHTML = JSON.stringify(result,undefined, 2);
  })

  document.getElementById('get_orders').addEventListener('submit', async (event) => {
    event.preventDefault();
    const gatewayFetch = await fetch(gateway + '/api/orders', { method: 'GET' });
    const result = await gatewayFetch.json();
    output.innerHTML = JSON.stringify(result,undefined, 2);
  })

  document.getElementById('get_order_by_id').addEventListener('submit', async (event) => {
    event.preventDefault();
    const id = event.target['id'].value;
    const gatewayFetch = await fetch(gateway + '/api/orders/' + id, { method: 'GET' });
    const result = await gatewayFetch.json();
    output.innerHTML = JSON.stringify(result,undefined, 2);
  })

  document.getElementById('add_item_to_order').addEventListener('submit', async (event) => {
    event.preventDefault();
    const id = event.target['id'].value;
    const gatewayFetch = await fetch(gateway + '/api/orders/' + id + '/addition', { method: 'PUT' });
    const result = await gatewayFetch.json();
    output.innerHTML = JSON.stringify(result,undefined, 2);
  })

  document.getElementById('perform_payment').addEventListener('submit', async (event) => {
    event.preventDefault();
    const id = event.target['id'].value;
    const username = event.target['username'].value;
    const cardAuthorizationInfo = (event.target['auth'].checked === true) ? 'AUTHORIZED' : 'UNAUTHORIZED';
    const gatewayFetch = await fetch(gateway + '/api/orders/' + id + '/payment', {
      method: 'PUT',
      headers: {'Content-Type': 'application/json;charset=utf-8'},
      body: JSON.stringify({ 'username' : username, 'cardAuthorizationInfo' : cardAuthorizationInfo })
    });
    const result = await gatewayFetch.json();
    output.innerHTML = JSON.stringify(result,undefined, 2);
  })

  document.getElementById('change_order_statust').addEventListener('submit', async (event) => {
    event.preventDefault();
    const id = event.target['id'].value;
    const status = event.target['status'].value;
    const gatewayFetch = await fetch(gateway + '/api/orders/' + id + '/status/' + status, { method: 'PUT' });
    const result = await gatewayFetch.json();
    output.innerHTML = JSON.stringify(result,undefined, 2);
  })
}
