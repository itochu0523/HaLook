/*******************************************************************************
 * WGP 0.2 - Web Graphical Platform (https://sourceforge.net/projects/wgp/)
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2012 Acroquest Technology Co.,Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 ******************************************************************************/


HDFSView = wgp.AbstractView.extend({
    initialize:function(argument){ 

////////////////////////////////////////////////////////////
//option start
////////////////////////////////////////////////////////////
HDFSConstants = {};

HDFSConstants.bgColor = "#303232";

HDFSConstants.mainCircle = {};
HDFSConstants.mainCircle.size = 350;
HDFSConstants.mainCircle.innerRate = 0.2;
HDFSConstants.mainCircle.transferLineColor = "#EEEEEE";

HDFSConstants.dataNode = {};
HDFSConstants.dataNode.frameColor = "#FFFFFF";
HDFSConstants.dataNode.color = {
									good : "#0C80A0",
									full : "#F09B4A",
									dead : "#AE1E2F"
								};

HDFSConstants.blockTransfer = {};
HDFSConstants.blockTransfer.color = {inward : "#0C80A0", outward : "#0C80A0"};

HDFSConstants.rack = {};
HDFSConstants.rack.height = 10;
HDFSConstants.rack.colors = ["#666666","#AAAAAA","#CCCCCC"];
////////////////////////////////////////////////////////////
//option end
////////////////////////////////////////////////////////////

		HDFSConstants.dataNode.status = {};
		HDFSConstants.dataNode.status.good = 0;
		HDFSConstants.dataNode.status.full = 1;
		HDFSConstants.dataNode.status.dead = 2;

		//largen area
		$("#contents_area_0").css("height",700);
		
		//hidden div for data node info popup 
		$("#" + this.$el.attr("id")).parent().prepend('<div id="nodeStatusBox" style="padding:10px; color:white; position:absolute; border:white 2px dotted; display:none"></div>');
    	
		//slider on the top
    	$("#" + this.$el.attr("id")).parent().prepend('<div id="jquery-ui-slider" style="width:600px; margin:15px;clear:left;"></div>');
    	$('#jquery-ui-slider').slider({
    		min: 0,
    		max: 100,
    		value : 100,
    		change: function(event, ui){
       			stopAnimation();
       		    if(ui.value == 100){
    				restartAnimation();
    			}else{
    				drawStaticDataNode(); 
    			}
    		}
    	});
    	
    	$("#" + this.$el.attr("id")).css("background-color",HDFSConstants.bgColor);    	
    	this.viewType = wgp.constants.VIEW_TYPE.VIEW;
    	this.collection = new MapElementList();
		if(argument["collection"]){
	    	this.collection = argument["collection"];
		}

		var uniqueId = -1;
		function getUniqueId(){
			uniqueId++;
			return uniqueId;
		}
		
    	this.width = argument["width"];
    	this.height = argument["height"];
    	this.maxId = 0;
    	
        var realTag = $("#" + this.$el.attr("id"));
        if (this.width == null) {
            this.width = realTag.width();
        }
        if (this.height == null) {
            this.height = realTag.height();
        }

        this.viewCollection = {};
		this.registerCollectionEvent();
		this.render();		
		
////////////////////////////////////////////////////////////
//init of the views in HDFSView
////////////////////////////////////////////////////////////
		//vars
		var center = {x : viewArea2.width/2, y : viewArea2.height/2};
		var numDataNode = dataFromServer.data.length;		
		var dataNodeChangeType = wgp.constants.CHANGE_TYPE.ADD;
		var blockTransferChangeType = wgp.constants.CHANGE_TYPE.ADD;
		var anglePart = toRadian(360/numDataNode);
		var radius = HDFSConstants.mainCircle.size/2;
		var width = HDFSConstants.mainCircle.size * Math.PI / numDataNode;
		var numRackColors = HDFSConstants.rack.colors.length;
		
		var currentDN = [];
		var diff = [];
		
		
		//function in order to give each view unique id
		function outer(){
		    var x = -1;
		    return　function (){
		        x = x + 1;
		    	return x;
		    };

		}
		var getUniqueId = outer();
		var nextId = 0;
		
		//obj in order to manage relation between id numbers with dn
		var dnIdManager = {
				ids : [],
				add : function (number, host){
					this.ids[host] = number;
				},
				remove : function (host){
					delete(this.ids[number]);
				},
				find : function (host){
					return this.ids[host];
				}
		};
		

		//obj in order to manage relation between id numbers with bt
		var btIdManager = {
				ids : [],
				add : function (number, host){
					this.ids[host] = number;
				},
				remove : function (host){
					delete(this.ids[number]);
				},
				find : function (host){
					return this.ids[host];
				}
		};

		
		//function to get radian value from angle
		function toRadian(angle){
			return angle * Math.PI / 180;
		}
		
		//function to decide color o data node bar, depending on nodes status
		function nodeColor(status){
			if(status == HDFSConstants.dataNode.status.good){
				return HDFSConstants.dataNode.color.good;
			}else if(status == HDFSConstants.dataNode.status.full){
				return HDFSConstants.dataNode.color.full;
			}else{
				return HDFSConstants.dataNode.color.dead;
			}
		}
		
		//function to stop animation and hide transfer ball when slider event occurs
		function stopAnimation(){
			clearInterval(timerDn);
			clearInterval(timerBt);
		}
		
		function restartAnimation(){
			var timerDn = setInterval(dataNodeInterval("contents_area_0"),5000);
			var timerBt = setInterval(blockTransferInterval("contents_area_0"),5000);
		}
		
		function drawStaticDataNode(){
			///////temporary function: renew input data
			setDataFromServer();
			///////temporary function: renew input data									
			setTimeout(dataNodeInterval("contents_area_0"),500);			
		}
////////////////////////////////////////////////////////////
//static views
////////////////////////////////////////////////////////////
		
		for(var i=0; i<numDataNode; i++){
			var pathString = "M"+center.x+","+center.y
								+" L"+(center.x+radius*Math.cos(anglePart*i))
								+","+(center.y+radius*Math.sin(anglePart*i))
								+" Z";
			this.paper.path(pathString).attr({
				"stroke-width" : 2,
			    "stroke" : HDFSConstants.mainCircle.transferLineColor
				});
		}

		this.paper.circle(
				center.x,
				center.y,
				HDFSConstants.mainCircle.size/2 * HDFSConstants.mainCircle.innerRate
			).attr({
			    "fill" : HDFSConstants.dataNode.color.good,
			    "stroke" : HDFSConstants.dataNode.color.good
			});
		
		var rack = [];
		var rackOfLastHost = "";
		var index = 0;
		for(var i=0; i<numDataNode; i++){
			nextId = getUniqueId();
			
			if(rackOfLastHost != dataFromServer.data[i].rack){
				index++;
				index = index%numRackColors;
				rackOfLastHost = dataFromServer.data[i].rack;
			}
			rack[i] = {
				    type:dataNodeChangeType,
				    objectName:"DataNodeRectangle",
				    objectId : nextId,
				    id : nextId,
				    width : width,
				    height : HDFSConstants.rack.height,
				    angle : anglePart*i,
				    zIndex : 2,
				    centerX : center.x,
				    centerY : center.y,
				    radius : radius-HDFSConstants.rack.height,
				    host : dataFromServer.data[i].host,
				    color : HDFSConstants.rack.colors[index],
				    strokeColor : HDFSConstants.rack.colors[index]
			};
		}
		
		for(var i=0; i<numDataNode; i++){
			var capacity = dataFromServer.data[i].capacity;
			this.paper.path([
			                 [
			                  "M",
			                  center.x + radius * Math.cos(anglePart*i) + width * Math.cos(anglePart*i-Math.PI/2) / 2,
			                  center.y - radius * Math.sin(anglePart*i) - width * Math.sin(anglePart*i-Math.PI/2) / 2
			                 ],
			                 [
			                  "l",
			                  capacity * Math.cos(anglePart*i),
			                  -capacity * Math.sin(anglePart*i)
			                 ],
			                 [
			                  "l",
			                  width * Math.cos(anglePart*i+Math.PI/2),
			                  -width * Math.sin(anglePart*i+Math.PI/2) 
			                 ],
			                 [
			                  "l",
			                  -capacity * Math.cos(anglePart*i),
			                  capacity * Math.sin(anglePart*i)
			                 ]
			                ]).attr({
			                	stroke : HDFSConstants.dataNode.frameColor
			                });
		}

		var mainCircleInterval = function(windowId){
			function innerFunction(){
				var addData = [{
				    windowId:windowId,
				    data:rack
				}];
				appView.notifyEvent(addData);
			};
			return innerFunction;
		};

////////////////////////////////////////////////////////////
//dynamic views
////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////
//data node
////////////////////////////////////////////////////////////
		var dataNodeInterval = function(windowId){
			function innerFunction(){
				///////temporary function: renew input data
				setDataFromServer();
				///////temporary function: renew input data									
				if(dataNodeChangeType == wgp.constants.CHANGE_TYPE.ADD){
					for(var i=0; i<numDataNode; i++){
						nextId = getUniqueId();
						var status = 0;
						if(dataFromServer.data[i].capacity*0.9 < dataFromServer.data[i].used){
							status = HDFSConstants.dataNode.status.full;
						}else if(dataFromServer.data[i].used == 0){
							status = HDFSConstants.dataNode.status.dead;						
						}
						currentDN[i] = {
							    type:dataNodeChangeType,
							    objectName:"DataNodeRectangle",
							    objectId : nextId,
							    id : nextId,
							    width : width,
							    height : dataFromServer.data[i].used,
							    angle : anglePart*i,
							    zIndex : 0,
							    centerX : center.x,
							    centerY : center.y,
							    radius : radius,
							    host : dataFromServer.data[i].host,
							    capacity : dataFromServer.data[i].capacity,
							    color : nodeColor(status),
							    strokeColor : nodeColor(status)
						};
						dnIdManager.add(nextId,currentDN[i].host);
					}
					dataNodeChangeType = wgp.constants.CHANGE_TYPE.UPDATE;
				}else{
					for(var i=0; i<numDataNode; i++){
						diff[i] = dataFromServer.data[i].used - currentDN[i].height;
						var status = 0;
						if(dataFromServer.data[i].capacity*0.9 < dataFromServer.data[i].used){
							status = HDFSConstants.dataNode.status.full;
						}else if(dataFromServer.data[i].used == 0){
							status = HDFSConstants.dataNode.status.dead;						
						}
						
						currentDN[i] = {
							    type:dataNodeChangeType,
							    objectId : dnIdManager.find(dataFromServer.data[i].host),
							    id : dnIdManager.find(dataFromServer.data[i].host),
							    height : dataFromServer.data[i].used,
							    color : nodeColor(status),
							    strokeColor : nodeColor(status),
							    diff : diff[i]
						};
					}
				}
				var addData = [{
				    windowId:windowId,
				    data:currentDN
				}];
				appView.notifyEvent(addData);
				/////////////////////////////
				/////////////////////////////
				//write codes of when the number of data node has changed
				/////////////////////////////
				/////////////////////////////
			};
			return innerFunction;
		};
		
		
////////////////////////////////////////////////////////////
//block transfer
////////////////////////////////////////////////////////////
		var transfer = [];
		
		var blockTransferInterval = function(windowId){
			function innerFunction(){
				if(diff.length > 0){
					if(blockTransferChangeType == wgp.constants.CHANGE_TYPE.ADD){
						for(var i=0; i<numDataNode; i++){
							nextId = getUniqueId();
							transfer[i] = {
								    type:blockTransferChangeType,
								    objectName:"BlockTransferAnimation",
								    objectId : nextId,
								    id : nextId,
								    size : diff[i],
								    zIndex : 0,
								    centerX : center.x,
								    centerY : center.y,
								    radius : radius + Math.abs(diff[i]),
								    color : HDFSConstants.blockTransfer.color,
									angle : anglePart*i
							}
							btIdManager.add(nextId,dataFromServer.data[i].host);
							//console.log(transfer);
						}
						blockTransferChangeType = wgp.constants.CHANGE_TYPE.UPDATE;
					}else{
						for(var i=0; i<numDataNode; i++){
							transfer[i] = {
								    type:blockTransferChangeType,
								    objectId : btIdManager.find(dataFromServer.data[i].host),
								    id : btIdManager.find(dataFromServer.data[i].host),
								    size : diff[i],
								    radius : radius + Math.abs(diff[i]),
							}
						}
					}
					var addData = [{
					    windowId:windowId,
					    data:transfer
					}];
					appView.notifyEvent(addData);
				}
			};
			return innerFunction;
		};
		
		var timerMc = setTimeout(mainCircleInterval("contents_area_0"),5);
		var timerDnInit = setTimeout(dataNodeInterval("contents_area_0"),10);
		var timerDn = setInterval(dataNodeInterval("contents_area_0"),5000);
		var timerBt = setInterval(blockTransferInterval("contents_area_0"),5000);

    },
    
    
    
    
    
    
    render:function(){
        this.paper =  new Raphael(document.getElementById(this.$el.attr("id")), this.width, this.height);    	
    },
    onAdd:function(mapElement){
    	var id = mapElement.id;
		if(id == null){
			id = this.maxId;
			this.maxId++;

			var idAttributeName = mapElement.idAttribute;
			mapElement.set({idAttributeName : id}, {silent: true});
		}else{
			if(id > this.maxId){
				this.maxId = id + 1;
			}
		}

		// if same id exists, process as change event
		if(this.viewCollection[id]){
			this.viewCollection[id].destory();
			console.log(id+" already Exists");
		}
		var objectName = "wgp." + mapElement.get("objectName");
    	var view = eval("new " + objectName + "({model:mapElement, paper:this.paper})");
    	this.viewCollection[id] = view;

    },
	onChange:function(mapElement){
		this.viewCollection[mapElement.id].update(mapElement);
	},
	onRemove:function(mapElement){
		var objectId = mapElement.get("objectId");
		this.viewCollection[objectId].remove(mapElement);
		delete this.viewCollection[objectId];
	}
});

_.bindAll(wgp.MapView);