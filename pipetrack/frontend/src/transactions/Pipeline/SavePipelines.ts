import {TransactionScript} from '../TransactionScript';
import {IPipeline} from '../../components/PipelineComponent/PipelineComponent';
import executePython from '../../utils/executePython';
import Pipeline from '../../entities/Pipeline';

class SavePipelines extends TransactionScript {
	run(newPipelines: Record<string, IPipeline>) {
		executePython(`display(Javascript("window.pipelineData = ${JSON.stringify(newPipelines)}"))`);

		Pipeline.set(newPipelines);
	}
}

export default new SavePipelines();
