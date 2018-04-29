var trends = require('node-google-search-trends');
trends('United States', 10, function(err, data) {
    if (err) return console.err(err);
    console.log(JSON.stringify(data, null, 2));  // Pretty prints JSON 'data'
}); 