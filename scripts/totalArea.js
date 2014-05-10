	var totalArea = []
	for(key in json){
		if(json[key].info.area != 0){
			var poly = json[key].info.area;
			for(i=0; i < poly.length; i++){
				totalArea.push(poly[i].area);
			}
		}
	}

	var myTotal = 0;

	
	for(var i=0; i<totalArea.length; i++){
    	myTotal += totalArea[i];  //Iterate over your first array and then grab the second element add the values up
    }
  console.log(myTotal);
