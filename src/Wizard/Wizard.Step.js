import React from "react";

import { WizardContext } from "./Wizard.Provider";
import {
  Input,
  Message,
  Radio,
  Product,
  Link,
  Phone,
  Email,
  TOS,
  Total
} from "./Components";

class Step extends React.Component {
  renderComponents = (components, isComponentVisible) => {
    return components.map((component, key) => {
      if (isComponentVisible(component)) {
        switch (component.type) {
          case "text":
          case "number":
          case "password":
            return <Input key={`wsc-${key}`} component={component} />;
          case "radio":
            return <Radio key={`wsc-${key}`} component={component} />;
          case "message":
            return <Message key={`wsc-${key}`} component={component} />;
          case "product":
            return <Product key={`wsc-${key}`} component={component} />;
          case "link":
            return <Link key={`wsc-${key}`} component={component} />;
          case "phone":
            return <Phone key={`wsc-${key}`} component={component} />;
          case "email":
            return <Email key={`wsc-${key}`} component={component} />;
          case "tos":
            return <TOS key={`wsc-${key}`} component={component} />;
          case "total":
            return <Total key={`wsc-${key}`} component={component} />;
          default:
            return null;
        }
      } else {
        return null;
      }
    });
  };
  render() {
    return (
      <WizardContext.Consumer>
        {({ state, isComponentVisible }) => (
          <div className="step-view">
            {this.renderComponents(
              state.steps[state.currentStep].components,
              isComponentVisible
            )}
          </div>
        )}
      </WizardContext.Consumer>
    );
  }
}

export default Step;
