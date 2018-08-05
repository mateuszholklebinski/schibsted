export class DataBinder {
	constructor() {
		this.model = {};
		this.view = {};
		this.elementToBindData = [];
		this.propertiesToBindData = [];
		
		this.bindingString = "data-bind";
		this.bindedProps = ["href", "src", "alt", "title"];
	}

	bind(model, view) {
		this.view = view;
		this.registerListeners(model);
		this.renderElement();
	}
	
	registerListeners(model) {
		let setter = {
			get: (target, key) =>  {
				if (typeof target[key] === 'object' && target[key] !== null) {
				  return new Proxy(target[key], setter)
				} else {
				  return target[key];
				}
			  },
			  set: (target, key, value) =>  {
				target[key] = value; 
				this.renderElement();
				return true;
			}
		};
		
		this.model = new Proxy(model, setter); 
	}
	
	renderElement() {
		this.elementToBindData = this.view.querySelectorAll('['+this.bindingString+']');
		this.elementToBindData.forEach((singleElement) => {
			let valueFromModel = this._findValueInModel(singleElement.getAttribute(this.bindingString));
			if(typeof valueFromModel != 'undefined') {
				singleElement.innerHTML = valueFromModel;
			}
		});
		this.propertiesToBindData = [];
		this.bindedProps.forEach((singleProp) => {
			let elementsToBindData = this.view.querySelectorAll('['+this.bindingString+'-'+singleProp+']');
			elementsToBindData.forEach((singleElement) => {
				let valueFromModel = this._findValueInModel(singleElement.getAttribute(this.bindingString+"-"+singleProp));
				if(typeof valueFromModel != 'undefined') {
					singleElement.setAttribute(singleProp ,valueFromModel);
				}
			})
		});
	}
	
	_findValueInModel(propertyName) {
		let propertyChain = propertyName.split(".");
		return this.getProperty(this.model, propertyChain);
	}
	
	getProperty(model, chain) {
		if(chain.length === 1) {
			return model[chain[0]];
		} else {
			return this.getProperty(model[chain[0]], chain.slice(1));
		}
	}
}
	