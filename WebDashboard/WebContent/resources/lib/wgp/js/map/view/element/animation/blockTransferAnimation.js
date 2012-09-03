wgp.BlockTransferAnimation = Backbone.View.extend({
    initialize:function(argument){
       	_.bindAll();
        this._paper = argument.paper;
        if (this._paper == null) {
            alert("paper is not exist");
            return;
        }
        this.id = this.model.get("objectId");
        this.render();
        this.animate();
    },
    render:function(){
    	var cx = this.model.attributes.centerX + 
    				this.model.attributes.radius * 
    				Math.cos(this.model.attributes.angle);
    	var cy = this.model.attributes.centerY - 
    				this.model.attributes.radius * 
    				Math.sin(this.model.attributes.angle);
    	var size = Math.abs(this.model.attributes.size);
    	var color = this.model.attributes.color.inward;
    	
    	if(this.model.attributes.size > 0){
    		cx = this.model.attributes.centerX;
    		cy = this.model.attributes.centerY;
    		color = this.model.attributes.color.outward;
    	}
    	
    	
    	this.element = this._paper.circle(cx,cy,size).attr({
    													"fill" : color,
    													"stroke" : color
    												});
    	//this.glow = this.element.glow({width:20,color:"#fff",opacity:0.3});
    },
    update:function(model){
    	this.element.hide();
    	this.render();
    	this.animate();
    },
    remove:function(property){
        //this.element.object.remove();
        //this.glow.remove();
        this.element.hide();
    },
    animate:function(){
		var viewAttr = this.model.attributes;
		var tinyDiff = 2500;
    	if(this.model.attributes.size < 0){
    		this.element.animate(
    				{cx:viewAttr.centerX,cy:viewAttr.centerY},
    				tinyDiff
    				);
    	}else{
        	var cx = viewAttr.centerX + 
        				viewAttr.radius * 
						Math.cos(viewAttr.angle);
        	var cy = viewAttr.centerY - 
        				viewAttr.radius * 
        				Math.sin(viewAttr.angle);
        	var self = this;
            setTimeout(function(){
            	self.element.animate(
            			{cx:cx,cy:cy},
            			tinyDiff
            		);
            },2400);

    		//this.element.animate({cx:cx,cy:cy},tinyDiff);
    	}
    	//,callback:this.hide();
    }
});