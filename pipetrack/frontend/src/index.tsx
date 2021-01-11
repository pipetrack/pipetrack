import React from 'react';
import './index.css';
import IntegrationController from './controllers/IntegrationController';

// @ts-ignore
const id = IntegrationController.isScriptsInserted ? window.lastReactRootID : 'root';

IntegrationController.insertScripts(id);
