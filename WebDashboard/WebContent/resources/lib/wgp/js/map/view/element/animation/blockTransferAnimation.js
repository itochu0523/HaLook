wgp.BlockTransferAnimation = Backbone.View.extend({
    initialize:function(argument){
    	var args = this.model.attributes;
    	args.cos = Math.cos(args.angle);
    	args.sin = Math.sin(args.angle);

    	this.centerStandby = 
			[
			 ["M", 
			  args.center.x,
			  args.center.y
			 ],
			 ["l", 
			  halook.hdfs.constants.blockTransfer.width * args.cos,
			  -halook.hdfs.constants.blockTransfer.width * args.sin
			 ]
			];
    	this.edgeStandby = [
    	       			 ["M", 
    	    			  args.center.x 
    	    			  + halook.hdfs.constants.mainCircle.radius * args.cos,
    	    			  args.center.y 
    	    			  - halook.hdfs.constants.mainCircle.radius * args.sin
    	    			 ],
    	    			 ["l", 
    	    			  -halook.hdfs.constants.blockTransfer.width * args.cos,
    	    			  halook.hdfs.constants.blockTransfer.width * args.sin
    	    			 ]
    	    			];
    	this.inTransfer = [
    	    			 ["M", 
    	    			  args.center.x 
    	    			  + halook.hdfs.constants.mainCircle.radius * args.cos, 
    	    			  args.center.y 
    	    			  - halook.hdfs.constants.mainCircle.radius * args.sin
    	    			  ],
    	    			 ["L",
    	    			  args.center.x,
    	    			  args.center.y]
    	    		];

       	_.bindAll();
        this._paper = argument.paper;
        if (this._paper == null) {
            alert("paper is not exist");
            return;
        }
        this.id = this.model.get("objectId");
        //this.render();
        //this.animate();
        this.standby();
    },
    render:function(){

    },
    update:function(model){
    	this.standby();
    	this.animate();
    },
    remove:function(property){
        //this.element.object.remove();
        //this.glow.remove();
        this.element.hide();
    },
    standby:function(){
    	if(this.model.attributes.size < 0){
    		this._standbyAtEdge();
    	}else{
    		this._standbyAtCenter();
    	}
    },
    _standbyAtEdge:function(){
    	this.element
    	 = this._paper.path(this.edgeStandby).attr(
    			 {"stroke-width" : halook.hdfs.constants.blockTransfer.width}
    	 	);
    },
    _standbyAtCenter:function(){
    	this.element
    	 = this._paper.path(this.centerStandby).attr(
    			 {"stroke-width" : halook.hdfs.constants.blockTransfer.width}
    		);
    },
    animate:function(){
		var args = this.model.attributes;
    	if(args.size < 0){
    		this.element.attr(this._transparency()).animate({
    			path:this.inTransfer
    			},halook.hdfs.constants.cycle/8);
    		var self = this;
    		setTimeout(function(){
    			self.element.animate({
    				path:self.centerStandby
    			},halook.hdfs.constants.cycle/8,function(){self.element.remove()})
    		},halook.hdfs.constants.cycle/4);
    	}else{
    		var self = this;
    		setTimeout(function(){
    			self.element.attr(self._transparency()).animate({
    				path:self.inTransfer
    			},halook.hdfs.constants.cycle/8)
    		},halook.hdfs.constants.cycle/2);
    		setTimeout(function(){
    			self.element.animate({
    				path:self.edgeStandby
    			},halook.hdfs.constants.cycle/8,function(){self.element.remove()})
    		},halook.hdfs.constants.cycle/4*3);
    	}
    },
    _transparency:function(size){
    	var trans = Math.abs(this.model.attributes.size)/
    					halook.hdfs.constants.blockTransfer.colorThreshold;
    	var obj = {
    				"stroke" : "rgba(255,255,255,"+trans+")"
				};
    	return obj;
    }
});