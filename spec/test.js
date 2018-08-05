import {DataBinder} from './../databinder/DataBinder';

describe("[DEFAULTS] DataBinder", function() {
  it("'s view should be object by default", function() {
    var dataBinder = new DataBinder();

    expect(typeof(dataBinder.view)).toBe("object");
  });
  
  it("'s model should be object by default", function() {
    var dataBinder = new DataBinder();

    expect(typeof(dataBinder.model)).toBe("object");
  });
  
  it("'s propertiesToBindData should be empty array by default", function() {
    var dataBinder = new DataBinder();

    expect(Array.isArray(dataBinder.propertiesToBindData)).toBe(true);
    expect(dataBinder.propertiesToBindData.length).toBe(0);
  });
  
  it("'s elementToBindData should be empty array by default", function() {
    var dataBinder = new DataBinder();

    expect(Array.isArray(dataBinder.elementToBindData)).toBe(true);
    expect(dataBinder.elementToBindData.length).toBe(0);
  });
  
  it("'s binding string should be data-bind", function() {
    var dataBinder = new DataBinder();

    expect(dataBinder.bindingString).toBe("data-bind");
  });
  
  it("'s binding properties should be array od href, src, alt, title", function() {
    var dataBinder = new DataBinder();

    expect(Array.isArray(dataBinder.bindedProps)).toBe(true);
    expect(dataBinder.bindedProps.length).toBe(4);
    expect(dataBinder.bindedProps[0]).toBe("href");
    expect(dataBinder.bindedProps[1]).toBe("src");
    expect(dataBinder.bindedProps[2]).toBe("alt");
    expect(dataBinder.bindedProps[3]).toBe("title");
  });
});
	
describe("[getProperty] DataBinder", function() {
	it("'s getProperty method should return value form model", function() {
    var dataBinder = new DataBinder();

	var model = {
		a: 'test'
	};
	
	var model2 = {
		a: {
			b: 'test'
		}
	};
	
	var model3 = {
		a: {
			b: {
				c: 'test'
			}
		}
	};
	
	var model4 = {
		a: {
			b: {
				c: {
					d: 'test'
				}
			}
		}
	};
	
	var model5 = {
		a: {
			b: {
				c: 'test'
			}
		}
	};
	
	var model6 = {
		a: {
			b: {
				c: {
					d: ''
				}
			}
		}
	};
	
    expect(dataBinder.getProperty(model, ["a"])).toBe("test");
    expect(dataBinder.getProperty(model2, ["a", "b"])).toBe("test");
    expect(dataBinder.getProperty(model3, ["a", "b", "c"])).toBe("test");
    expect(dataBinder.getProperty(model4, ["a", "b", "c", "d"])).toBe("test");
    expect(dataBinder.getProperty(model6, ["a", "b", "c", "d"])).toBe("");
    expect(dataBinder.getProperty(model5, ["a", "b", "c", "d"])).not.toBeDefined(); 
  });
});

describe("[_findValueInModel] DataBinder", function() {
	it("'s _findValueInModel method should return value form model by string", function() {
   
	var model = {
		a: 'test'
	};
	
	var model2 = {
		a: {
			b: 'test'
		}
	};
	
	var model3 = {
		a: {
			b: {
				c: 'test'
			}
		}
	};
	
	var model4 = {
		a: {
			b: {
				c: {
					d: 'test'
				}
			}
		}
	};
	
	var model5 = {
		a: {
			b: {
				c: 'test'
			}
		}
	};
	
	var model6 = {
		a: {
			b: {
				c: {
					d: ''
				}
			}
		}
	};
	
	var dataBinder = new DataBinder();
	dataBinder.model = model;
    expect(dataBinder._findValueInModel("a")).toBe("test");
	dataBinder.model = model2;
    expect(dataBinder._findValueInModel("a.b")).toBe("test");
	dataBinder.model = model3;
    expect(dataBinder._findValueInModel("a.b.c")).toBe("test");
    dataBinder.model = model4;
	expect(dataBinder._findValueInModel("a.b.c.d")).toBe("test");
    dataBinder.model = model6;
	expect(dataBinder._findValueInModel("a.b.c.d")).toBe("");
	dataBinder.model = model5;
    expect(dataBinder._findValueInModel("a.b.c.d")).not.toBeDefined(); 
  });
}); 