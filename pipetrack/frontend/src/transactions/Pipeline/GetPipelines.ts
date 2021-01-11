import {TransactionScript} from '../TransactionScript';
import Pipeline from '../../entities/Pipeline';

class GetPipelines extends TransactionScript {
	run() {
		return Pipeline.getAll();
	}
}

export default new GetPipelines();
