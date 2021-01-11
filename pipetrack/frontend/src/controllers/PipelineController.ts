import {IPipeline} from '../components/PipelineComponent/PipelineComponent';
import GetPipelines from '../transactions/Pipeline/GetPipelines';

class PipelineController {
	get favoritePipeline() {
		return Object.values(this.pipelineList).find(pipeline => pipeline.__favorite === '1');
	}

	get pipelineList(): Record<string, IPipeline> {
		return GetPipelines.run();
	}
}

export default new PipelineController();
