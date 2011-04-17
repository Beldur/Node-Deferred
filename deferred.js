var jqD = require('jqDeferred');

var Database = {
    Store: { 0: 'Alex', 1: 'Peter' },
    getValue: function(index) {
        var tot = Math.random() * 5000,
            reject = Math.random() > 0.75 ? true : false,
            that = this,
            dfd = jqD.Deferred(function() {
                // Simulate slow Data access
                setTimeout(function() {
                    if (reject) {
                        console.log('rejecting...');
                        dfd.reject(new Error('Failed to load data'));
                    } else {
                        console.log('resolving...');
                        dfd.resolve({ Name: that.Store[index], Timeout: tot });
                    }
                }, tot);
            });
        
        return dfd.promise();
    }
};

jqD.when(
    Database.getValue(0),
    Database.getValue(1)
).then(function() {
    // This function only gets called if both data access methods resolve
    var dfd = this;
    console.log('resolved ' + arguments[0].Name + ' and ' + arguments[1].Name + ' with', arguments);
}, function() {
    // This function gets called if one data access rejects
    var dfd = this;
    console.log('rejected with', arguments);
});