var dataStorage = (function(cache, async) {
    var _ds = {
		data: {},
		dataQueue: [],
		cache: cache || false, //'+1'
		async: async || true,
		init: function(){
			if(_ds.async){
				setInterval(function() {
					var first = _ds.dataQueue.shift();
					if (first && first.key && first.value) {
						_ds._save(first.key, first.value);
					}
				}, 200);
			}
		},
		_save: function(key, value){
			localStorage[key] = JSON.stringify(value);
		},
		getData: function(key) {
			if (_ds.data[key] !== undefined) {
				return _ds.data[key];
			}
			else if (localStorage && localStorage[key] !== undefined) {
				var obj = JSON.parse(localStorage[key]);
				_ds.data[key] = obj;
				return obj;
			}
			return undefined;
		},
		putData: function(key, value) {
			_ds.data[key] = value;
			
			if(_ds.cache){
				value.timestamp = new Date().setHours(_ds.cache).toString();
				console.log(cache, value.timestamp);
			}

			if(_ds.async){
				_ds.dataQueue.push({
					key: key,
					value: value
				});
			}
			else {
				_ds._save(key,value);
			}
		},
		removeData: function(key) {
			delete _ds.data[key];
			delete localStorage[key];
		}
	};

	_ds.init();

	return {
		getData: _ds.getData,
		putData: _ds.putData,
		removeData: _ds.removeData
	};

})('+1',true);