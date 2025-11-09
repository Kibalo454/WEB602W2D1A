var MongoClient = require('mongodb').MongoClient;

var client = new MongoClient('mongodb://127.0.0.1:27017/nodemongo');

client.connect()
  .then(function () {
    var dbo = client.db('nodemongo');

    /*
    dbo.createCollection('customers').then(function () {
      console.log('Collection created');
      client.close();
    });

    var custData = [
      { name: 'John', address: 'Highway 71' },
      { name: 'Peter', address: 'Lowstreet 4' },
      { name: 'Amy', address: 'Apple st 652' },
      { name: 'Hannah', address: 'Mountain 21' },
      { name: 'Michael', address: 'Valley 345' },
      { name: 'Sandy', address: 'Ocean blvd 2' },
      { name: 'Betty', address: 'Green Grass 1' },
      { name: 'Richard', address: 'Sky st 331' },
      { name: 'Susan', address: 'One way 98' },
      { name: 'Vicky', address: 'Yellow Garden 2' },
      { name: 'Ben', address: 'Park Lane 38' },
      { name: 'William', address: 'Central st 954' },
      { name: 'Chuck', address: 'Main Road 989' },
      { name: 'Viola', address: 'Sideway 1633' }
    ];

    dbo.collection('customers').insertMany(custData)
      .then(function (res) {
        console.log('Number of documents inserted: ' + res.insertedCount);
        client.close();
      });
    */

    // Update one document
    var myquery = { address: 'Valley 345' };
    var newvalues = { $set: { name: 'Mickey', address: 'Canyon 10' } };

    dbo.collection('customers').updateOne(myquery, newvalues)
      .then(function (res) {
        console.log('Document matched:', res.matchedCount);
        console.log('Document modified:', res.modifiedCount);

        // Fetch updated document to verify
        return dbo.collection('customers').findOne({ address: 'Canyon 10' });
      })
      .then(function (doc) {
        console.log('Updated document:', doc);
        client.close();
      })
      .catch(function (err) {
        console.log('Error:', err);
        client.close();
      });
  })
  .catch(function (error) {
    console.log('Failed to connect', error);
  });
