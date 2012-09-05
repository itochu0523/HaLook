var ganttChartParentView = wgp.AbstractView.extend({
	initialize : function() {
		this.viewType = wgp.constants.VIEW_TYPE.VIEW;
		this.collection = new GanttChartModelCollection();
		this.attributes = {};
		this.registerCollectionEvent();

		
		
		/**
		 * ganttChart
		 * 
		 */
		
		$("#" + this.$el.attr("id")).append('<div id="ganttChart" style="position:absolute;"></div>');
		$("#ganttChart").css({
			width:"890px",
			height:"500px",
			overflow : "scroll",
			backgroundColor:"#F0FFFF"
		});
		
		var ganttChart = new ganttChartView({
			id : "ganttChart", 
			rootView : this
		});

		/**
		 * ganttChartDetail
		 * 
		 */
		
		$("#" + this.$el.attr("id")).append('<div id="ganttChartDetail" style="position:relative"></div>');
		$("#ganttChartDetail").css({
			width:"890px",
			height:"210px",
			"margin-top" : "510px",
			overflow : "scroll",
		});
		$("#ganttChartDetail").html( "■JOB DETAIL" );
		
		var ganttChartDetail = new ganttChartDetailView({
			id : "ganttChartDetail", 
			rootView : this
		});

		this.maxId = 0;

		var realTag = $("#" + this.$el.attr("id"));
        if (this.width == null) {
            this.width = realTag.width();
        }
        if (this.height == null) {
            this.height = realTag.height();
        }

        
		console.log('called initialize parent view');
	},
	render : function() {
		console.log('call render');
	},
	onAdd : function(element) {
		console.log('call onAdd');
	},
	onChange : function(element) {
		console.log('called changeModel');
	},
	onRemove : function(element) {
		console.log('called removeModel');
	},
	

});