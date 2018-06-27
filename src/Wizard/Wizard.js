import React from "react";

import { Navigator } from "./Wizard.Navigator";
import { WizardStepButtons } from "./Wizard.Step.Buttons";
import Step from "./Wizard.Step";
import { WizardContext } from "./Wizard.Provider.js";
import ZipEditor from './ZipEditor';

import "./wizard.css";

class Wizard extends React.Component {
  state = {
    editZips: false
  }

  render() {
    return (
      <WizardContext.Consumer>
        {({ state, updateZips }) => (
          <React.Fragment>
            {this.state.editZips && (
              <div id="wizard">
                <ZipEditor zips={state.steps[0].components[1].values} updateZips={updateZips} onCancel={() => this.setState({ editZips: false })} />
              </div>
            )}
            {!this.state.editZips &&
              <div id="wizard">
                {!state.submitted && (
                  <React.Fragment>
                    <Navigator />
                    <Step />
                    <WizardStepButtons />
                  </React.Fragment>
                )}
                {state.submitted && (
                  <div className="success-message">{state.successMessage}</div>
                )}
                <button type="button" className="btn-save" onClick={() => this.setState({ editZips: true })}> Edit Zips</button>
              </div>
            }
          </React.Fragment>
        )}
      </WizardContext.Consumer>
    );
  }
}

export { Wizard };