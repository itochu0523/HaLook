wgp.detailElementView = Backbone.View.extend({
    initialize:function(argument){
    	_.bindAll();
        this._paper = argument.paper;
        if (this._paper == null) {
            alert("paper is not exist");
            return;
        }
        this.id = this.model.get("objectId");
        this.render();
    },
    render:function(){
    	var color = this.getStateColor();
    	var strokeWidth = this.getStateStrokeWidth();
    	this.element = new rectangle(this.model.attributes, this._paper);
},
    update:function(model){
        var instance = this;
    	var color = this.getStateColor();
    	this.model.set({"fill":color}, {silent:true});
    	this.element.setAttributes(model);
    },
    remove:function(property){
        this.element.hide();
    },
    getStateColor:function(){
        var state = this.model.get("state");
        var color = wgp.constants.STATE_COLOR[state];
        if (color == null) {
            color = wgp.constants.STATE_COLOR[wgp.constants.STATE.NORMAL];
        }
        return color;
    },
    getStateStrokeWidth:function(){
        var width = this.model.get("stroke");
        return width;
    }
});