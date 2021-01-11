import {TransactionScript} from '../TransactionScript';
import {IPipeline} from '../../components/Pipeline/Pipeline';
import executePython from '../../utils/executePython';

class SavePipelines extends TransactionScript {
	run(newPipelines: Record<string, IPipeline>) {
		executePython(`display(Javascript("window.pipelineData = ${JSON.stringify(newPipelines)}"))`);

		// TODO: db.save
	}
}

export default new SavePipelines();
