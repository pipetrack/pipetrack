import {TransactionScript} from '../TransactionScript';
import executePython from '../../utils/executePython';

class Integration extends TransactionScript {
	run(): Promise<void> {
		const code = `
import json
import os
from IPython.core.display import HTML, Javascript

try:
	f = open('log.json')
	all_log = json.load(f)
	f.close()
except IOError:
	all_log = {0:''}

content = f"""
	<script>
		window.pipelineData = {all_log}
	</script>"""

display(HTML(content))`.trim();

		return executePython(code);
	}
}

export default new Integration();