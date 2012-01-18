var dataStorage = (function(cache) {
    var data = {},
		dataQueue = [];

	setInterval(function() {
		var first = dataQueue.shift();
		if (first && first.key && first.value) {
			localStorage[first.key] = JSON.stringify(first.value);
		}
	}, 200);

	return {
		getData: function(key) {
			if (data[key] !== undefined) {
				return data[key];
			}
			else if (localStorage && localStorage[key] !== undefined) {
				var obj = JSON.parse(localStorage[key]);
				data[key] = obj;
				return obj;
			}
			return undefined;
		},
		putData: function(key, value) {
			data[key] = value;
			if (dataQueue) {
				if(cache){
					value.timestamp = new Date().setHours(cache).toString();
				}
				dataQueue.push({
					key: key,
					value: value
				});
			}
		}
	};
})('+1 h');