import {DataBinder} from './../databinder/DataBinder';

const model = {
	label: {
		label: {
			label: "sfdf"
		}
	},
	x: {
		y: {
			z: 'some awesome text'
		}
	},
	schib: {
		sted: "ok"
	},
	awesome: "hey awesome"
};

const viewTemplate = document.querySelector("#test");
const dataBinder = new DataBinder();
const view = dataBinder.bind(model, viewTemplate);

setTimeout(() => {
	dataBinder.model.label.label.label = "label.label.label";
}, 3000);

setTimeout(() => {
	dataBinder.model.schib.sted = "schib.sted";
}, 6000);

setTimeout(() => {
	dataBinder.model.x.y.z = "updated";
}, 9000);