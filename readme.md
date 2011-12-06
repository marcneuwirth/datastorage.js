# DataStorage.js

If you are using localStorage to store Objects, they need to be stringified first. Then when retrieving the object, the JSON needs to be parsed. This is [slow](http://jsperf.com/json-parsing-performance/4).

Instead, we can take advantage or localStorage to keep data between visits while still keeping Objects in memory during the session for repeated use without repeatedly parsing the same JSON.


##License: [The Unlicense](http://unlicense.org/)