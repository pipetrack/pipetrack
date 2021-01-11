import executePython from '../utils/executePython';

class Note {
	get(id: string) {
		// @ts-ignore
		return window.pipelineData[id].__note;
	}

	set(id: string, value: string) {
		const code = `
import json

try:
    f = open('log.json')
    all_log = json.load(f)
    f.close()
except IOError:
    all_log = {0:''}
    
for key in all_log:
    if isinstance(all_log[key], dict):
        if key == "${id}":
            all_log[key]["__note"] = "${value}"

with open('log.json', 'w') as f:
    json.dump(all_log, f)`.trim();

		return executePython(code);
	}
}

export default new Note();
