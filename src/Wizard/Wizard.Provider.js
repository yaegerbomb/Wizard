import React from "react";

export const WizardContext = React.createContext();

class WizardProvider extends React.Component {
  state = {
    globals: [
      {
        name: "totalPrice",
        value: 0
      },
      {
        name: "squareFoot",
        value: 450
      },
      {
        name: "buildingType",
        value: ""
      }
    ],
    steps: [
      {
        title: "Step 1",
        productSelector: false,
        components: [
          {
            type: "textInput",
            label: "Square Feet",
            required: true,
            valid: false,
            changes: ["squareFoot"]
          },
          {
            type: "radioInput",
            label: "Building Type",
            required: true,
            valid: false,
            changes: ["buildingType"]
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
            description: "something something something",
            price: 0.2,
            priceModified: ["squareFoot"],
            changes: ["totalPrice"],
            selected: false
          },
          {
            type: "product",
            label: "Basic Clean",
            description: "something something something",
            price: 0.3,
            priceModified: ["squareFoot"],
            selected: false,
            changes: ["totalPrice"]
          }
        ]
      }
    ],
    currentStep: 0
  };
  render() {
    return (
      <WizardContext.Provider
        value={{
          state: this.state,
          incrementStep: () => {
            let currentStep = this.state.currentStep;
            currentStep++;
            this.setState({ currentStep: currentStep });
          },
          decrementStep: () => {
            let currentStep = this.state.currentStep;
            currentStep--;
            this.setState({ currentStep: currentStep });
          },
          setStep: stepNumber => {
            this.setState({ currentStep: stepNumber });
          },
          selectProduct: product => {
            let { steps, currentStep, globals } = this.state;
            let stepToModify = steps[currentStep];
            let productToSelectIndex = stepToModify.components.findIndex(
              c => c === product
            );
            let productToSelect = stepToModify.components[productToSelectIndex];

            stepToModify.components[productToSelectIndex].selected = true;
            steps[currentStep] = stepToModify;

            productToSelect.changes.forEach(c => {
              let price = 0;
              if (productToSelect.priceModified.length > 0) {
                alert(price);
                productToSelect.priceModified.forEach(p => {
                  const curGlobal = globals.findIndex(g => g.name === p);
                  if (curGlobal >= 0) {
                    alert(JSON.stringify(globals[curGlobal]));
                    price += globals[curGlobal].value * productToSelect.price;
                  }
                });
              }
              let globalToModifyIndex = globals.findIndex(g => g.name === c);
              globals[globalToModifyIndex].value = price;
            });
            this.setState({ steps: steps, globals: globals });
          },
          deselectProduct: product => {
            let { steps, currentStep, globals } = this.state;
            let stepToModify = steps[currentStep];
            let productToSelectIndex = stepToModify.components.findIndex(
              c => c === product
            );
            let productToSelect = stepToModify.components[productToSelectIndex];

            stepToModify.components[productToSelectIndex].selected = false;
            steps[currentStep] = stepToModify;

            productToSelect.changes.map(c => {
              let price = 0;
              if (c.priceModified.length > 0) {
                c.priceModified.map(p => {
                  const curGlobal = globals.findIndex(g => g.name === p);
                  if (curGlobal >= 0) {
                    price -= curGlobal.value * c.price;
                  }
                });
              }
              let globalToModifyIndex = globals.findIndex(
                g => g.name === c.name
              );
              globals[globalToModifyIndex].value = price;
            });
            this.setState({ steps: steps, globals: globals });
          }
        }}
      >
        {this.props.children}
        {JSON.stringify(this.state)}
      </WizardContext.Provider>
    );
  }
}

export default WizardProvider;
