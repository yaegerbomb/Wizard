import React from "react";
import validator from "validator";

export const WizardContext = React.createContext();

class WizardProvider extends React.Component {
  state = {
    globals: [
      {
        name: "totalPrice",
        value: 0,
        label: "Total Price"
      },
      {
        name: "zipCode",
        value: "",
        label: "Zip Code"
      },
      {
        name: "zipPrice",
        value: "",
        label: "Zip Code"
      },
      {
        name: "squareFoot",
        value: 600,
        label: "Square Foot",
        onChange: [
          {
            func: "resetProducts"
          }
        ]
      },
      {
        name: "buildingType",
        value: "apartment",
        label: "Building Type"
      },
      {
        name: "buildingPrice",
        value: 20,
        label: "Building Price"
      },
      {
        name: "termsOfServiceClicked",
        value: false,
        label: "Terms Of Service Clicked"
      },
      {
        name: "firstName",
        value: "",
        label: "First Name"
      },
      {
        name: "lastName",
        value: "",
        label: "Last Name"
      },
      {
        name: "phoneNumber",
        value: "",
        label: "Phone Number"
      },
      {
        name: "email",
        value: "",
        label: "Email"
      },
      {
        name: "address",
        value: "",
        label: "Address"
      },
      {
        name: "buildingNumber",
        value: "",
        label: "Apartment / Condo Number"
      },
      {
        name: "city",
        value: "Seattle",
        label: "City"
      },
      {
        name: "state",
        value: "Washington",
        label: "State"
      }
    ],
    steps: [
      {
        title: "Step 1",
        productSelector: false,
        components: [
          {
            type: "message",
            value:
              "If you would like to schedule for cleaning services please provide to us two pieces of information so we may provide an accurate quote to you."
          },
          {
            type: "text",
            value: "",
            values: [
              {
                value: "98118",
                price: 20
              },
              {
                value: "98119",
                price: 18
              }
            ],
            label: "What is your ZIP code?",
            required: true,
            valid: false,
            minChars: 5,
            invalidMessage:
              "I am sorry but we do not service this zip code at this time.",
            changes: [
              { name: "zipCode", value: "value" },
              { name: "zipPrice", value: "price" }
            ]
          },
          {
            type: "number",
            value: 600,
            label:
              "What is the approximate interior square footage of your home?",
            required: true,
            valid: true,
            changes: [{ name: "squareFoot", value: "value" }]
          },
          {
            type: "radio",
            value: "apartment",
            values: [
              {
                value: "apartment",
                price: 20,
                label: "Apartment"
              },
              {
                value: "condo",
                price: 20,
                label: "Condo"
              },
              {
                value: "singleHome",
                price: 10,
                label: "Single Home"
              }
            ],
            label: "Building Type",
            required: true,
            valid: true,
            changes: [
              { name: "buildingType", value: "value" },
              { name: "buildingPrice", value: "price" } //means that we change this global value by price instead of the default value
            ]
          }
        ]
      },
      {
        title: "Step 2",
        productSelector: true,
        validType: "oneOf",
        valid: false,
        components: [
          {
            type: "product",
            label: "Sparkle",
            description: "A light clean. A way to give your space a tidy look.",
            price: 0.2,
            value: 0,
            byGlobal: true,
            priceModified: ["squareFoot"],
            changes: [{ name: "totalPrice", value: "value" }],
            selected: false
          },
          {
            type: "product",
            label: "Basic Clean",
            description:
              "Dusting and wiping down of counter tops, sinks, tubs, shower surrounds, toilets, furniture tops, window sills, baseboard heaters, the exterior of light fixture covers, vinyl, laminate, hardwood and tiled floors, interior window glass, mirrors, cabinet faces, the outside of all large appliances, the inside and outside of all small countertop appliances, dusting underneath of the range and refrigerator, hand washing the range hood filter, cleaning window tracks and vacuuming. General organizing such as making the bed, putting children's and dog's toys away, neatly piling papers and organizing like items to ensure the house is more orderly. We recommend requesting a basic clean once per month.",
            price: 0.3,
            value: 0,
            byGlobal: true,
            priceModified: ["squareFoot"],
            minCharge: 120,
            selected: false,
            changes: [{ name: "totalPrice", value: "value" }]
          },
          {
            type: "product",
            label: "Deep Clean",
            description:
              "This service includes everything in the Basic Clean plus the following: Wiping down all walls, light switches and plugs throughout the home to remove streaks, debris and fingerprints, cleaning underneath window tracks and the exterior of windows within reach, wiping down vertical and horizontal blinds, wiping down the inside of cabinets, furniture and appliances, cleaning the inside of light fixture covers, steam cleaning the inside of the range and underside of the range hood, dusting inside of the air vents on electronic appliances such as televisions and computers. We recommend requesting a deep clean twice per year.",
            price: 0.4,
            value: 0,
            byGlobal: true,
            priceModified: ["squareFoot"],
            minCharge: 240,
            selected: false,
            changes: [{ name: "totalPrice", value: "value" }]
          }
        ]
      },
      {
        title: "Step 3",
        productSelector: true,
        validType: "none",
        valid: false,
        components: [
          {
            type: "product",
            label: "Laundry",
            description:
              "Assuming you have a washer and dryer in your home, or on-site in the case of an apartment complex, we will wash and dry your laundry, fold or hang your clothing neatly and put them away. We always supply clothes washing detergent that is eco-friendly and laundry bags with our logo imprinted on them so our staff can identify what should be washed.",
            price: 35.0,
            value: 0,
            byGlobal: false,
            priceModified: [],
            changes: [{ name: "totalPrice", value: "value" }],
            selected: false,
            otherValueLabel: "Loads",
            otherQuantity: 0,
            otherQuantityMin: 1,
            showOtherQuantity: true
          }
        ]
      },
      {
        title: "Step 4",
        productSelector: true,
        validType: "none",
        valid: false,
        components: [
          {
            type: "message",
            value:
              "Before continuing you must agree to our terms, conditions and exclusions of service. Please read those below."
          },
          {
            type: "link",
            value: false,
            label: "Terms of Service",
            url: "http://www.google.com",
            required: true,
            valid: false,
            changes: [{ name: "termsOfServiceClicked", value: "value" }]
          }
        ]
      },
      {
        title: "Step 5",
        productSelector: true,
        validType: "none",
        valid: false,
        components: [
          {
            type: "message",
            value:
              "Please enter your contact details below. After you are finished, click next and a confirmation email will be sent to you. Our secretary will contact you within one business day to schedule your selected services at a time that is convenient for you."
          },
          {
            type: "message",
            value: "Reminder: Our hours are Monday through Friday 8am to 6pm."
          },
          {
            type: "text",
            value: "",
            placeholder: "First Name",
            label: "First Name",
            required: true,
            valid: false,
            changes: [{ name: "firstName", value: "value" }]
          },
          {
            type: "text",
            value: "",
            placeholder: "Last Name",
            label: "Last Name",
            required: true,
            valid: false,
            changes: [{ name: "lastName", value: "value" }]
          },
          {
            type: "phone",
            value: "",
            required: true,
            valid: false,
            changes: [{ name: "phoneNumber", value: "value" }]
          },
          {
            type: "email",
            value: "",
            placeholder: "Email",
            label: "Email",
            required: true,
            valid: false,
            changes: [{ name: "email", value: "value" }]
          },
          {
            type: "text",
            value: "",
            placeholder: "Address",
            label: "Address",
            required: true,
            valid: false,
            changes: [{ name: "address", value: "value" }]
          },
          {
            type: "text",
            value: "",
            placeholder: "#",
            label: "Apartment / Condo Number",
            required: true,
            valid: false,
            changes: [{ name: "buildingNumber", value: "value" }],
            visible: [
              {
                name: "buildingType",
                value: "singleHome",
                operation: "!equals"
              }
            ]
          },
          {
            type: "text",
            value: "",
            placeholder: "City",
            label: "City",
            required: true,
            valid: true,
            disabled: true,
            changes: [{ name: "city", value: "value" }]
          },
          {
            type: "text",
            value: "",
            placeholder: "State",
            label: "State",
            required: true,
            valid: true,
            disabled: true,
            changes: [{ name: "state", value: "value" }]
          }
        ]
      }
    ],
    currentStep: 0,
    submitted: false
  };
  incrementStep = () => {
    let currentStep = this.state.currentStep;
    currentStep++;
    if (currentStep >= this.state.steps.length) {
      currentStep = this.state.steps.length - 1;
    }
    this.setState({ currentStep: currentStep });
  };
  decrementStep = () => {
    let currentStep = this.state.currentStep;
    currentStep--;
    if (currentStep < 0) {
      currentStep = 0;
    }
    this.setState({ currentStep: currentStep });
  };
  isStepValid = currentStep => {
    const { steps } = this.state;
    let currentStepToModify = steps[currentStep];

    //check if all components are valid
    let valid = true;

    currentStepToModify.components.forEach((c, key) => {
      if (c.required && !c.valid && this.isComponentVisible(c)) {
        valid = false;
      }
    });

    if (currentStepToModify.validType === "oneOf") {
      let selected = currentStepToModify.components.filter(c => c.selected)
        .length;
      if (selected !== 1) {
        valid = false;
      }
    }

    return valid;
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
        this.setState({ currentStep: stepNumber });
      }
    } else {
      this.setState({ currentStep: stepNumber });
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

    //modify component value
    let componentToModify = stepToModify.components[componentToModifyIndex];
    componentToModify.previousValue = componentToModify.value;
    componentToModify.value = val;

    //whether we are valid or not
    if (!val && componentToModify.required) {
      componentToModify.valid = false;
    } else if (val && componentToModify.required) {
      //check if we have a set of predefined valued
      if (componentToModify.values) {
        let found = false;
        componentToModify.values.forEach(v => {
          if (v.value === val) {
            found = true;
          }
          componentToModify.valid = found;
        });
      } else if (componentToModify.type === "email") {
        componentToModify.valid = validator.isEmail(val);
      } else {
        componentToModify.valid = true;
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
      if (globals[globalToModifyIndex].onChange) {
        globals[globalToModifyIndex].onChange.forEach(g => {
          this[g.func]();
        });
      }
    });

    this.setState({ globals: globals, steps: steps });
  };
  showComponentInvalidMessage = component => {
    let show = false;
    if (!component.valid) {
      if (component.minChars && component.value.length >= component.minChars) {
        show = true;
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
              if (price < c.minCharge) {
                price = c.minCharge;
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

    //loop through each component in the step, find our component, then calculate the price
    stepToModify.components.forEach(c => {
      if (c === productToToggle) {
        let price = 0;
        if (value > 0) {
          //find out our price
          c.otherQuantity = value;
          price = c.otherQuantity * c.price;
          if (c.minCharge) {
            if (price < c.minCharge) {
              price = c.minCharge;
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
      }
    });

    steps[currentStep] = stepToModify;
    this.setState({ steps: steps, globals: globals });
  };
  submit = () => {
    this.setState({ submitted: true });
  };
  render() {
    return (
      <WizardContext.Provider
        value={{
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
          toggleProduct: this.toggleProduct,
          toggleQuantityProduct: this.toggleQuantityProduct,
          submit: this.submit
        }}
      >
        {this.props.children}
        <div style={{ marginTop: "40px" }}>
          <pre>{JSON.stringify(this.state, null, 2)}</pre>
        </div>
      </WizardContext.Provider>
    );
  }
}

export default WizardProvider;
