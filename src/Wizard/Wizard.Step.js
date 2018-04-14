import React from "react";

import { WizardContext } from "./Wizard.Provider";
import { Input, Message, Radio, Product } from "./Components";

class Step extends React.Component {
  renderInput = component => {};
  renderComponents = components => {
    return components.map((component, key) => {
      switch (component.type) {
        case "text":
        case "number":
        case "email":
        case "password":
          return <Input key={`wsc-${key}`} component={component} />;
        case "radio":
          return <Radio key={`wsc-${key}`} component={component} />;
        case "message":
          return <Message key={`wsc-${key}`} component={component} />;
        case "product":
          return <Product key={`wsc-${key}`} component={component} />;
        default:
          return null;
      }
    });
  };
  render() {
    return (
      <WizardContext.Consumer>
        {({ state }) => (
          <div>
            {this.renderComponents(state.steps[state.currentStep].components)}
          </div>
        )}
      </WizardContext.Consumer>
    );
  }
}

export default Step;
