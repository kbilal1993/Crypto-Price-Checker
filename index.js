const config = window.readConfig();
// Stores price of one bitcoin
var btcusd = 0;
var btcgbp = 0;
var btcusdchange = 0;

function setPalette() {
  document.documentElement.style.setProperty('--colour1', config.app.palette[0]);
  document.documentElement.style.setProperty('--colour2', config.app.palette[1]);
  document.documentElement.style.setProperty('--colour3', config.app.palette[2]);
};

function makePriceCard(value, difference) {
  var card = document.createElement("div");
  var price = document.createElement("p");
  var change = document.createElement("p");
  price.appendChild(document.createTextNode(value.toLocaleString("en-US", {style: 'currency', currency: 'usd'})));
  change.appendChild(document.createTextNode("(" + difference.toFixed(2) + "%)" ));
  card.className = "card";
  price.className = "price";
  change.className = "change";
  card.appendChild(price);
  card.appendChild(change);
  return card;
}

// Create a card containing a name and value
function makeAccountCard(name, value) {
  // Create nodes
  var card = document.createElement("div");
  var nameNode = document.createElement("p")
  var valueNode = document.createElement("p")
  // Set classes
  card.className = "card";
  nameNode.className = "name";
  valueNode.className = "value";
  // Set inner values
  nameNode.appendChild(document.createTextNode(name));
  valueNode.appendChild(document.createTextNode(value));
  card.appendChild(valueNode);
  card.appendChild(nameNode);
  return card;
}

// Add a card to the div with the id "template"
function insertCard(card) {
  document.getElementById("template").appendChild(card);
}

// Get the price of one bitcoin
function getonebtcamount(then) {
  fetch("https:/api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,gbp&include_24hr_change=true")
    .then(response => response.json())
    .then(data => {
    	btcusd = data.bitcoin.usd;
    	btcgbp = data.bitcoin.gbp;
      btcusdchange = data.bitcoin.usd_24h_change;
    })
    .then(x => then());
}

// Convert amount to pounds
function btcConvert(amount) {
  return parseFloat((amount * btcgbp).toFixed(2)).toLocaleString("en-GB", {style: 'currency', currency: 'gbp'});
}

// Run when page loaded
function main() {
  setPalette();
  getonebtcamount(() => {
    insertCard(makePriceCard(btcusd, btcusdchange));
    config.accounts.forEach(
      (a) => insertCard(makeAccountCard(a.name, btcConvert(a.amount))));
  });
}

main();
