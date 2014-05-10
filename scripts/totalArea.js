// http://crowdcrafting.org/app/landfill/tasks/export?type=task_run&format=json
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
	myTotal += totalArea[i];  
}
console.log(myTotal);
