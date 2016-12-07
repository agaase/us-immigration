var queries = {
	"countries_yr" : {
	 "size": 0, 
	 "query": {
	   "bool": {
	     "must": [
	       {"terms": {
	         "yr": [
	           1910
	         ]
	       }}
	     ]
	   }
	 },
	 "aggs": {
	   "rgion": {
	     "terms": {
	       "field": "region",
	       "size": 100
	     },
	     "aggs": {
	       "country": {
	         "terms": {
	           "field": "country",
	           "size": 100,
	           "order" : { "sum_v" : "desc" }
	         },
	         "aggs": {
	           "sum_v" : { "sum" : { "field" : "value"}}
	         }
	       }
	     }
	   }
	 }
	},
	"per_yr" : {
	  "size": 0,
	  "query": {
	    "match_all": {}
	  },
	  "aggs": {
	    "pr_yr": {
	      "terms": {
	        "field": "yr",
	        "size": 100
	      },
	      "aggs": {
	        "sum_v" : { "sum" : { "field" : "value"}}
	      }
	    }
	  }
	}

}
