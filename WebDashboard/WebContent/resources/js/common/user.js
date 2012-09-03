var HDFSViewElement = {
	viewClassName : "HDFSView",
	tabTitle : "HDFSView",
};

var HDFSParentElement = { 
	viewClassName : "wgp.MultiAreaView",
	rootView:appView,
	collection :[HDFSViewElement]
};

wgp.constants.VIEW_SETTINGS = {
	"default" : HDFSParentElement,
	//"/hdfsView/" : tabViewElement
};