import executePython, {execute} from '../utils/executePython';
import {IPipeline} from '../components/PipelineComponent/PipelineComponent';

class Pipeline {
	delete(id: string): Promise<void> {
		const code = `
import json

try:
    f = open('log.json')
    all_log = json.load(f)
    f.close()
except IOError:
    all_log = {0:''}
    
all_log.pop("${id}", None)

with open('log.json', 'w') as f:
    json.dump(all_log, f)`.trim();

		return executePython(code);
	}

	set(pipelines: Record<string, IPipeline>): Promise<void> {
		const code = `
import json

with open('log.json', 'w') as f:
    f.write("""${JSON.stringify(pipelines)}""")`.trim();


		return execute(code);
	}

	get(id: string): IPipeline {
		// @ts-ignore
		return window.pipelineData[id];
	}

	getAll(): Record<string, IPipeline> {
		// @ts-ignore
		return window.pipelineData;
	}
}

export default new Pipeline();
