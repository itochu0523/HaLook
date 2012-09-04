wgp.DataNodeRectangle = Backbone.View.extend({
    initialize:function(argument){
    	//default initialize
       	_.bindAll();
    	this.center = argument.center;
        this._paper = argument.paper;
        if (this._paper == null) {
            alert("paper is not exist");
            return;
        }
        this.id = this.model.get("objectId");
    	
        this.render();
    	this.bindEvent();
    },
    render:function(){
    	var args = this.model.attributes;
    	var cos = Math.cos(args.angle);
    	var sin = Math.sin(args.angle);
    	var origin = {
    		x : args.center.x + halook.hdfs.constants.mainCircle.radius * cos
    				+ args.width * sin/2,
    		y : args.center.y - halook.hdfs.constants.mainCircle.radius * sin
    				+ args.width * cos/2
    	};
    	
    	var topEdge = {
    		x :  -args.width * sin,
    		y : -args.width * cos
    	};

    	var leftEdge = {
    		x :  args.height * cos,
    		y : -args.height * sin
    	};
    	var usage = parseInt(this.model.attributes.height / this.model.attributes.capacity * 100);
    	var status = halook.hdfs.constants.dataNode.status.good;
    	if(usage > 85){
    		status = halook.hdfs.constants.dataNode.status.full;
    	}else if(usage == 0){
    		status = halook.hdfs.constants.dataNode.status.dead;
    	}
    	this.element = this._paper.path(
    			[
    			 ["M", origin.x, origin.y],
    			 ["l", topEdge.x, topEdge.y],
    			 ["l", leftEdge.x, leftEdge.y],
    			 ["l", -topEdge.x, -topEdge.y],
    			 ["Z"]
    			]).attr({
    				"fill" : this._statusColor(status),
    				"stroke" : halook.hdfs.constants.dataNode.frameColor
    			});
    	this.element.toBack();
    },
    bindEvent:function(){
    	var self = this;
    	var usage = parseInt(this.model.attributes.height / this.model.attributes.capacity * 100);
    	this.element.mouseover(function (){
    		$("#nodeStatusBox").html(
    				"host : "+self.model.attributes.host+
    				"<br>capacity : "+self.model.attributes.capacity+
    				"<br>usage : "+usage+"%"
    		);
    		$("#nodeStatusBox").css("display","block");
    		$("#nodeStatusBox").css("top",parseInt(this.attrs.path[0][2]+50));
    		$("#nodeStatusBox").css("left",parseInt(this.attrs.path[0][1]+50));
    		$("#nodeStatusBox").css("background-color","rgba(255,255,255,0.9)");
    		$("#nodeStatusBox").css("color","#222222");
    		$("#nodeStatusBox").css("z-index",100);    		
    	});
    	this.element.mouseout(function (){
    		$("#nodeStatusBox").css("display","none");
    	});
    },
    update:function(model){
        if(this.model.attributes.diff < 0){
        	this.element.hide();
        	this.element.remove();
        	this.render();
    	}else{
    		var self = this;
            setTimeout(function(){
            	self.element.hide();
            	self.render();
            },halook.hdfs.constants.cycle*0.625);
    	}
    	this.bindEvent();
    },
    hide:function(){
        //this.glow.remove();
        this.element.hide();
    },
    remove:function(property){
        this.element.object.remove();
        //this.glow.remove();
        this.element.hide();
    },
    _statusColor:function(status){
    	if(status == halook.hdfs.constants.dataNode.status.good){
    		return halook.hdfs.constants.dataNode.color.good;
    	}else if(status == halook.hdfs.constants.dataNode.status.full){
    		return halook.hdfs.constants.dataNode.color.full;
    	}else{
    		return halook.hdfs.constants.dataNode.color.dead;    		
    	}
    }
});