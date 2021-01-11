import executePython from '../utils/executePython';
import App from '../components/App/App';
import React from 'react';
import ReactDOM from 'react-dom';
import Integration from '../transactions/Integration/Integration';

class IntegrationController {
	get isScriptsInserted() {
		// @ts-ignore
		return !!window.lastReactRootID;
	}

	sendMessage(code: string) {
		return executePython(code)
	}

	insertScripts(id: string) {
		const app = React.createElement(App);
		ReactDOM.render(app , document.getElementById(id));
	}

	integrate() {
		return Integration.run();
	}
}

export default new IntegrationController();
