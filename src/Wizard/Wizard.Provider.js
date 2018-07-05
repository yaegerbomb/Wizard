import React from "react";
import validator from "validator";
import { WizardState } from "./Utils";

export const WizardContext = React.createContext();

class WizardProvider extends React.Component {
  state = {
    loading: true,
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    this.setState({
      loading: true
    }, () => {
      fetch('/choreology/wp-json/wizard/v1/api/config')
        .then((resp) => resp.json())
        .then((data) => {
          this.setState({
            ...data,
            loading: false
          });
        }).catch((error) => {
          console.log(error);
        });
    });
  }

  resetData = () => {
    this.setState({
      state: WizardState()
    })
  }

  incrementStep = () => {
    let currentStep = this.state.currentStep;
    currentStep++;
    if (currentStep >= this.state.steps.length) {
      currentStep = this.state.steps.length - 1;
    }
    this.setState({ currentStep: currentStep }, () => {
      const view = document.getElementById("step");
      view.scrollTop = 0;
    });
  };
  decrementStep = () => {
    let currentStep = this.state.currentStep;
    currentStep--;
    if (currentStep < 0) {
      currentStep = 0;
    }
    this.setState({ currentStep: currentStep }, () => {
      const view = document.getElementById("step");
      view.scrollTop = 0;
    });
  };
  isStepValid = currentStep => {
    return true;
  };
  isFirstStep = () => {
    return this.state.currentStep === 0;
  };
  isLastStep = () => {
    return this.state.currentStep === this.state.steps.length - 1;
  };
  setStep = stepNumber => {
    if (stepNumber !== 0) {
      let valid = true;
      for (let i = 0; i < stepNumber; i++) {
        if (!this.isStepValid(i)) {
          valid = false;
        }
      }
      if (valid) {
        this.setState({ currentStep: stepNumber }, () => {
          const view = document.getElementById("step");
          view.scrollTop = 0;
        });
      }
    } else {
      this.setState({ currentStep: stepNumber }, () => {
        const view = document.getElementById("step");
        view.scrollTop = 0;
      });
    }
  };
  isComponentVisible = component => {
    let show = true;

    if (component.visible && component.visible.length > 0) {
      component.visible.forEach(v => {
        const global = this.state.globals.find(g => {
          return g.name === v.name;
        });

        switch (v.operation) {
          case "greaterEqual":
            show = global.value >= v.value;
            break;
          case "lessEqual":
            show = global.value <= v.value;
            break;
          case "less":
            show = global.value < v.value;
            break;
          case "greater":
            show = global.value > v.value;
            break;
          case "!equals":
            show = global.value !== v.value;
            break;
          case "equals":
          default:
            show = global.value === v.value;
            break;
        }
      });
    }

    return show;
  };
  //used for non product components to update global values
  updateComponentValue = (component, val) => {
    let { steps, currentStep, globals } = this.state;
    let stepToModify = steps[currentStep];
    let componentToModifyIndex = stepToModify.components.findIndex(
      c => c === component
    );

    if (val === "") {
      val = 0;
    }

    //modify component value
    let componentToModify = stepToModify.components[componentToModifyIndex];

    //check if our first value is 0, if so take it out of our new value
    if (componentToModify.value == 0 && val.toString().indexOf("0") > -1) {
      val = val.toString().replace("0", "");
    }

    //if we have a max length then cut off after the max char limit
    //this goes first else we get annoying user experience with 6000 => 999
    if (
      componentToModify.maxLength &&
      val.length > componentToModify.maxLength
    ) {
      val = val.substring(0, componentToModify.maxLength);
    }

    //check if we are a number and if we are that we dont have a min/max value we can be
    if (componentToModify.type === "number") {
      //safari fails at type=number inputs only allowing numbers
      if (val < 0) {
        val = 0;
      }
      val = val.toString().replace(/[^0-9]/gi, "");
      if (componentToModify.min && val < componentToModify.min) {
        val = componentToModify.min;
      }
      if (componentToModify.max && val > componentToModify.max) {
        val = componentToModify.max;
      }
    }

    //if we have a regex then regex value before applying
    if (componentToModify.regex) {
      if (componentToModify.regex === "numeric") {
        val = val.toString().replace(/[^0-9]/gi, "");
      }
      if (componentToModify.regex === "alpha") {
        val = val.toString().replace(/[^a-z]/gi, "");
      }
      if (componentToModify.regex === "alphanumeric") {
        val = val.toString().replace(/[^a-z0-9]/gi, "");
      }
    }

    //check if we are related to any external values and if so act upon them
    if (componentToModify.relatedTo) {
      componentToModify.relatedTo.forEach(r => {
        const globalToReferenceIndex = globals.findIndex(
          g => g.name === r.name
        );
        const globalValue = globals[globalToReferenceIndex].value;

        switch (r.action) {
          case "lessThanOrEqualTo":
            if (val >= globalValue) {
              val = globalValue;
            }
            break;
          case "greaterThanOrEqualTo":
            if (val <= globalValue) {
              val = globalValue;
            }
            break;
          case "lessThan":
            if (val > globalValue) {
              val = globalValue;
            }
            break;
          case "greaterThan":
            if (val < globalValue) {
              val = globalValue;
            }
            break;
          default:
        }
      });
    }

    componentToModify.previousValue = componentToModify.value
      ? componentToModify.value
      : 0;

    componentToModify.value = val;

    //whether we are valid or not
    if (!val && componentToModify.required) {
      componentToModify.valid = false;
    } else if (val && componentToModify.required) {
      componentToModify.valid = true;

      //check if we have a global value to compare to
      if (componentToModify.validates) {
        var globalToReferenceIndex = globals.findIndex(
          g => g.name === componentToModify.validates.name
        );
        if (val != globals[globalToReferenceIndex].value) {
          componentToModify.valid = false;
        }
      }

      //check if we have a set of predefined valued
      if (componentToModify.values && componentToModify.valid) {
        let found = false;
        componentToModify.values.forEach(v => {
          if (v.value === val) {
            found = true;
          }
          componentToModify.valid = found;
        });
      }

      if (componentToModify.type === "email" && componentToModify.valid) {
        componentToModify.valid = validator.isEmail(val);
      }

      if (componentToModify.maxSoft) {
        if (componentToModify.value > componentToModify.maxSoft) {
          componentToModify.valid = false;
        }
      }
    }

    stepToModify.components[componentToModifyIndex] = componentToModify;
    steps[currentStep] = stepToModify;

    componentToModify.changes.forEach(c => {
      const globalToModifyIndex = globals.findIndex(g => g.name === c.name);
      if (c.value === "value") {
        globals[globalToModifyIndex].previousValue =
          globals[globalToModifyIndex].value;

        globals[globalToModifyIndex].value = val;
      } else {
        const specialValue = componentToModify.values.find(v => {
          return v.value === val;
        });
        if (specialValue) {
          globals[globalToModifyIndex].previousValue =
            globals[globalToModifyIndex].value;
          globals[globalToModifyIndex].value = specialValue[c.value];
        }
      }

      //if there is a function to call when we change value, call it
      if (globals[globalToModifyIndex].onChange && componentToModify.valid) {
        globals[globalToModifyIndex].onChange.forEach((g, i) => {
          this[g.func](globals[globalToModifyIndex], i);
        });
      }

      if (componentToModify.valid && componentToModify.onChange) {
        componentToModify.onChange.forEach(oc => {
          if (oc.func === "revalidateComponent") {
            this[oc.func](stepToModify.components[oc.by]);
          }
        });
      }
    });

    this.setState({ globals: globals, steps: steps });
  };
  showComponentInvalidMessage = component => {
    let show = false;
    if (!component.valid) {
      if (
        component.minChars &&
        component.value.toString().length >= component.minChars
      ) {
        show = true;
      }

      if (component.invalidMessageCondition) {
        switch (component.invalidMessageCondition) {
          case "@":
            if (component.value.indexOf("@") > -1) {
              show = true;
            }
            break;
          case "gt":
            if (component.value > component.invalidMessageValue) {
              show = true;
            }
            break;
        }
      }
    }

    return show;
  };
  getComponentValue = component => {
    if (component.value) {
      return component.value;
    } else if (component.changes.length > 0) {
      return this.state.globals.find(g => {
        return g.name === component.changes[0].name;
      }).value;
    } else if (component.type === "number") {
      return 0;
    } else {
      return "";
    }
  };
  resetProducts = () => {
    let { steps, globals } = this.state;
    steps.forEach(step => {
      step.components.forEach(component => {
        if (component.type === "product") {
          if (component.selected) {
            component.changes.forEach(ch => {
              let globalToModifyIndex = globals.findIndex(
                g => g.name === ch.name
              );
              globals[globalToModifyIndex].value -= component.value;
            });
            component.selected = false;
            component.value = 0;
          }
        }
      });
    });
  };
  toggleProduct = product => {
    let { steps, currentStep, globals } = this.state;
    let stepToModify = steps[currentStep];
    let productToSelectIndex = stepToModify.components.findIndex(
      c => c === product
    );
    let productToToggle = stepToModify.components[productToSelectIndex];

    //loop through each component in the step, find our component, then calculate the price
    stepToModify.components.forEach(c => {
      if (c === productToToggle) {
        if (!c.selected) {
          c.changes.forEach(ch => {
            let price = 0;
            //calculate price based on all globals
            if (productToToggle.priceModified.length > 0) {
              productToToggle.priceModified.forEach(p => {
                const curGlobal = globals.findIndex(g => g.name === p);
                if (curGlobal >= 0) {
                  price += globals[curGlobal].value * productToToggle.price;
                }
              });
            }
            //make sure we are at least our min price
            if (c.minCharge) {
              if (!c.minCharge.conditional) {
                if (price < c.minCharge) {
                  price = c.minCharge;
                }
              } else {
                let minChargeSet = false;
                c.minCharge.values.forEach(mc => {
                  if (mc.default && !minChargeSet) {
                    //if we have set our min charge based on something else then we dont set our default
                    if (price < mc.default) {
                      price = mc.default;
                    }
                  } else {
                    var componentToCheck =
                      stepToModify.components[mc.component];
                    if (mc.value === "gt0") {
                      if (componentToCheck.value === 0) {
                        if (price < mc.minCharge) {
                          price = mc.minCharge;
                          minChargeSet = true;
                        }
                      }
                    }
                  }
                });
              }
            }
            c.value = price;
            let globalToModifyIndex = globals.findIndex(
              g => g.name === ch.name
            );
            globals[globalToModifyIndex].previousValue =
              globals[globalToModifyIndex].value;
            globals[globalToModifyIndex].value += price;
          });
        } else {
          c.changes.forEach(ch => {
            let globalToModifyIndex = globals.findIndex(
              g => g.name === ch.name
            );
            globals[globalToModifyIndex].previousValue =
              globals[globalToModifyIndex].value;
            globals[globalToModifyIndex].value -= c.value;
            c.value = 0;
          });
        }

        c.selected = !c.selected;
      } else if (stepToModify.validType === "oneOf") {
        //if our valid type if oneOf we need to see if we deselect ourselves
        c.selected = false;
        c.changes.forEach(ch => {
          let globalToModifyIndex = globals.findIndex(g => g.name === ch.name);
          globals[globalToModifyIndex].value -= c.value;
          c.value = 0;
        });
      }
    });

    steps[currentStep] = stepToModify;

    this.setState({ steps: steps, globals: globals });
  };
  toggleQuantityProduct = (product, value) => {
    let { steps, currentStep, globals } = this.state;
    let stepToModify = steps[currentStep];
    let productToSelectIndex = stepToModify.components.findIndex(
      c => c === product
    );
    let productToToggle = stepToModify.components[productToSelectIndex];

    if (value === "") {
      value = 0;
    }

    //check if our first value is 0, if so take it out of our new value
    if (
      productToToggle.otherQuantity == 0 &&
      value.toString().indexOf("0") > -1
    ) {
      value = value.toString().replace("0", "");
    }

    //make sure value is positive
    value = value < 0 ? 0 : value;

    //safari fails at type=number inputs only allowing numbers
    value = value.toString().replace(/[^0-9]/gi, "");
    value = parseFloat(value);

    //check if we are related to any external values and if so act upon them
    if (productToToggle.relatedTo) {
      productToToggle.relatedTo.forEach(r => {
        const globalToReferenceIndex = globals.findIndex(
          g => g.name === r.name
        );
        let globalValue = globals[globalToReferenceIndex].value;
        globalValue = parseFloat(globalValue);

        if (r.maxLength) {
          const length = globalValue.toString().length;
          if (value.toString().length > length) {
            value = parseFloat(value.toString().substring(0, length));
          }
        }

        //check if we are a number and if we are that we dont have a min/max value we can be
        if (productToToggle.min && value < productToToggle.min) {
          value = productToToggle.min;
        }
        if (productToToggle.max && value > productToToggle.max) {
          value = productToToggle.max;
        }

        switch (r.action) {
          case "lessThanOrEqualTo":
            if (value >= globalValue) {
              value = globalValue;
            }
            break;
          case "greaterThanOrEqualTo":
            if (value <= globalValue) {
              value = globalValue;
            }
            break;
          case "lessThan":
            if (value > globalValue) {
              value = globalValue;
            }
            break;
          case "greaterThan":
            if (value < globalValue) {
              value = globalValue;
            }
            break;
          default:
        }
      });
    } else {
      //check if we are a number and if we are that we dont have a min/max value we can be
      if (productToToggle.min && value < productToToggle.min) {
        value = productToToggle.min;
      }
      if (productToToggle.max && value > productToToggle.max) {
        value = productToToggle.max;
      }
    }

    //loop through each component in the step, find our component, then calculate the price
    stepToModify.components.forEach(c => {
      if (c === productToToggle) {
        let price = 0;
        if (value > -1) {
          //find out our price
          c.otherQuantity = value.toString();
          price = c.otherQuantity * c.price;
          if (c.minCharge && value > 0) {
            if (!c.minCharge.conditional) {
              if (price < c.minCharge) {
                price = c.minCharge;
              }
            } else {
              let minChargeSet = false;
              c.minCharge.values.forEach(mc => {
                if (mc.default && !minChargeSet) {
                  //if we have set our min charge based on something else then we dont set our default
                  if (price < mc.default) {
                    price = mc.default;
                  }
                } else {
                  var componentToCheck = stepToModify.components[mc.component];
                  if (mc.value === "gt0") {
                    if (componentToCheck.value === 0) {
                      if (price < mc.minCharge) {
                        price = mc.minCharge;
                        minChargeSet = true;
                      }
                    }
                  }
                }
              });
            }
          }
        }

        //add our value to each global
        c.changes.forEach(ch => {
          let globalToModifyIndex = globals.findIndex(g => g.name === ch.name);
          globals[globalToModifyIndex].previousValue =
            globals[globalToModifyIndex].value;
          globals[globalToModifyIndex].value -= c.value;
          globals[globalToModifyIndex].value += price;
        });

        c.value = price;

        if (c.onChange) {
          c.onChange.forEach(oc => {
            this[oc.func](stepToModify.components[oc.by]);
          });
        }
      }
    });

    steps[currentStep] = stepToModify;
    this.setState({ steps: steps, globals: globals });
  };
  updateGlobal = (global, onChangeIndex) => {
    if (global.value && global.previousValue !== global.value) {
      let { globals } = this.state;
      const onChangeValues = global.onChange[onChangeIndex];
      const globalToModifyIndex = globals.findIndex(
        g => g.name === onChangeValues.name
      );
      switch (onChangeValues.by) {
        case "add":
          globals[globalToModifyIndex].previousValue =
            globals[globalToModifyIndex].value;
          globals[globalToModifyIndex].value -= global.previousValue;
          globals[globalToModifyIndex].value += global.value;
          break;
        default:
          break;
      }

      this.setState({ globals: globals });
    }
  };
  getTotalPrice = () => {
    let val = this.state.globals.find(g => g.name === "totalPrice").value;
    return val;
  };
  revalidateComponent(component) {
    this.updateComponentValue(component, component.value);
  }
  revalidateQuantityProduct(component) {
    this.toggleQuantityProduct(component, component.otherQuantity);
  }
  submit = () => {
    //this.setState({ submitted: true });
  };

  updateAppProductState = (product, productChanges) => {
    let { steps, currentStep } = this.state;
    let stepToModify = steps[currentStep];
    let productToSelectIndex = stepToModify.components.findIndex(
      c => c === product
    );
    let productToModify = stepToModify.components[productToSelectIndex];
    productToModify = productChanges;
    stepToModify.components[productToSelectIndex] = productToModify;

    steps[currentStep] = stepToModify;

    this.setState({ steps: steps });
  };

  updateAppComponentState = (component, componentChanges) => { };

  updateZips = (zips) => {
    let { steps } = this.state;
    let stepToModify = steps[0];
    let productToModify = stepToModify.components[1];
    let zipValues = productToModify.values;

    zipValues = zips;
    productToModify.values = zipValues;
    stepToModify[1] = productToModify;
    steps[0] = stepToModify;
    this.setState({
      steps
    });
    alert("Changes saved!");
  }

  cloneComponent = (product) => {
    let { steps, currentStep } = this.state;
    let stepToModify = steps[currentStep];
    let productToSelectIndex = stepToModify.components.findIndex(
      c => c === product
    );
    let productToClone = JSON.parse(JSON.stringify(stepToModify.components[productToSelectIndex]));

    stepToModify.components.push(productToClone);

    steps[currentStep] = stepToModify;

    this.setState({ steps: steps });
  }

  moveUp = (product) => {
    let { steps, currentStep } = this.state;
    let stepToModify = steps[currentStep];
    let components = stepToModify.components;
    let productToSelectIndex = stepToModify.components.findIndex(
      c => c === product
    );

    if (productToSelectIndex !== 0) {
      components[productToSelectIndex] = components.splice(productToSelectIndex - 1, 1, components[productToSelectIndex])[0];
      stepToModify.components = components;
      steps[currentStep] = stepToModify;
      this.setState({ steps: steps });
    }
  }

  moveDown = (product) => {
    let { steps, currentStep } = this.state;
    let stepToModify = steps[currentStep];
    let components = stepToModify.components;
    let productToSelectIndex = stepToModify.components.findIndex(
      c => c === product
    );

    if (productToSelectIndex !== (components.length - 1)) {
      components[productToSelectIndex] = components.splice(productToSelectIndex + 1, 1, components[productToSelectIndex])[0];
      stepToModify.components = components;
      steps[currentStep] = stepToModify;
      this.setState({ steps: steps });
    }
  }

  saveNewState = () => {
    this.resetProducts();
    let isSure = window.confirm("Are you sure you want to update the wizard? This cannot be undone!");
    if (isSure) {
      let url = `/choreology/wp-json/wizard/v1/api/config?_wpnonce=${window.nonce}`;
      fetch(url, {
        method: "POST", // or 'PUT'
        body: JSON.stringify({
          "data": {
            ...this.state,
            currentStep: 0,
            submitted: false
          }
        }),
        headers: new Headers({
          "Content-Type": "application/json"
        })
      })
        .then(res => {
          return res.json();
        })
        .then(json => {
          this.getData();
          alert("Changes saved successfully");
        })
        .catch(error => {
          console.error("Error:", error);
          alert("Error with saving");
        });
    }
  }

  render() {
    return (
      <React.Fragment>
        {!this.state.loading &&
          <WizardContext.Provider
            value={{
              originalState: this.state,
              state: this.state,
              incrementStep: this.incrementStep,
              decrementStep: this.decrementStep,
              isStepValid: this.isStepValid,
              isFirstStep: this.isFirstStep,
              isLastStep: this.isLastStep,
              setStep: this.setStep,
              isComponentVisible: this.isComponentVisible,
              updateComponentValue: this.updateComponentValue,
              showComponentInvalidMessage: this.showComponentInvalidMessage,
              getComponentValue: this.getComponentValue,
              resetProducts: this.resetProducts,
              updateGlobal: this.updateGlobal,
              toggleProduct: this.toggleProduct,
              toggleQuantityProduct: this.toggleQuantityProduct,
              getTotalPrice: this.getTotalPrice,
              submit: this.submit,
              updateAppProductState: this.updateAppProductState,
              updateZips: this.updateZips,
              cloneComponent: this.cloneComponent,
              moveUp: this.moveUp,
              moveDown: this.moveDown,
              saveNewState: this.saveNewState
            }}
          >
            {this.props.children}
            {/* {JSON.stringify(this.state)} */}
          </WizardContext.Provider>
        }
      </React.Fragment>
    );
  }
}

export default WizardProvider;
