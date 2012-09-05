//var hdfsViewTestDataSender = function (){

	var now = new Date();
	var year = now.getYear(); // 年
	var month = now.getMonth() + 1; // 月
	var day = now.getDate(); // 日
	var hour = now.getHours(); // 時
	var min = now.getMinutes(); // 分
	var sec = now.getSeconds(); // 秒
	
	dataNo = 0;
	dataFromServer = {};
	setDataFromServer();
	function setDataFromServer(){
	dataFromServer = {
		timestamp : year+month+day+"_"+hour+":"+min+":"+sec,
		data : [
			{host : "host1", rack : "rack0", capacity : 16, used : parseInt(16*Math.random())},
			{host : "host2", rack : "rack0", capacity : 180, used : parseInt(180*Math.random())},
			{host : "host3", rack : "rack0", capacity : 32, used : parseInt(32*Math.random())},
			{host : "host4", rack : "rack0", capacity : 40, used : parseInt(40*Math.random())},
			{host : "host5", rack : "rack0", capacity : 158, used : parseInt(158*Math.random())},
			{host : "host6", rack : "rack0", capacity : 67, used : parseInt(67*Math.random())},
			{host : "host7", rack : "rack1", capacity : 23, used : parseInt(23*Math.random())},
			{host : "host8", rack : "rack1", capacity : 38, used : parseInt(38*Math.random())},
			{host : "host9", rack : "rack1", capacity : 20, used : parseInt(20*Math.random())},
			{host : "host10", rack : "rack1", capacity : 165, used : parseInt(165*Math.random())},
			{host : "host11", rack : "rack1", capacity : 38, used : parseInt(38*Math.random())},
			{host : "host12", rack : "rack1", capacity : 160, used : parseInt(160*Math.random())},
			{host : "host13", rack : "rack1", capacity : 153, used : parseInt(153*Math.random())},
			{host : "host14", rack : "rack2", capacity : 37, used : parseInt(37*Math.random())},
			{host : "host15", rack : "rack2", capacity : 68, used : parseInt(68*Math.random())},
			{host : "host16", rack : "rack2", capacity : 51, used : parseInt(51*Math.random())},
			{host : "host17", rack : "rack2", capacity : 83, used : parseInt(83*Math.random())},
			{host : "host18", rack : "rack2", capacity : 183, used : parseInt(183*Math.random())},
			{host : "host19", rack : "rack2", capacity : 182, used : parseInt(182*Math.random())},
			{host : "host20", rack : "rack2", capacity : 11, used : parseInt(11*Math.random())},
			{host : "host21", rack : "rack3", capacity : 149, used : parseInt(149*Math.random())},
			{host : "host22", rack : "rack3", capacity : 20, used : parseInt(20*Math.random())},
			{host : "host23", rack : "rack3", capacity : 4, used : parseInt(4*Math.random())},
			{host : "host24", rack : "rack3", capacity : 137, used : parseInt(137*Math.random())},
			{host : "host25", rack : "rack3", capacity : 184, used : parseInt(184*Math.random())},
			{host : "host26", rack : "rack3", capacity : 92, used : parseInt(92*Math.random())},
			{host : "host27", rack : "rack3", capacity : 33, used : parseInt(33*Math.random())},
			{host : "host28", rack : "rack4", capacity : 178, used : parseInt(178*Math.random())},
			{host : "host29", rack : "rack4", capacity : 11, used : parseInt(11*Math.random())},
			{host : "host30", rack : "rack4", capacity : 29, used : parseInt(29*Math.random())},
			{host : "host31", rack : "rack4", capacity : 145, used : parseInt(145*Math.random())},
			{host : "host32", rack : "rack4", capacity : 191, used : parseInt(191*Math.random())},
			{host : "host33", rack : "rack4", capacity : 163, used : parseInt(163*Math.random())},
			{host : "host34", rack : "rack4", capacity : 159, used : parseInt(159*Math.random())},
			{host : "host35", rack : "rack5", capacity : 174, used : parseInt(174*Math.random())},
			{host : "host36", rack : "rack5", capacity : 135, used : parseInt(135*Math.random())}
		]
	};
	}
