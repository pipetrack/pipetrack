import {TransactionScript} from '../TransactionScript';
import executePython from '../../utils/executePython';

class SetFavoritePipeline extends TransactionScript {
	run(id: string, value: '0'|'1'): Promise<void> {
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
            all_log[key]["__favorite"] = "${value}"
        else:
            all_log[key]["__favorite"] = "0"

with open('log.json', 'w') as f:
    json.dump(all_log, f)`.trim();

		return executePython(code);
	}
}

export default new SetFavoritePipeline();
