import {TransactionScript} from '../TransactionScript';
import Pipeline from '../../entities/Pipeline';

class DeletePipeline extends TransactionScript {
	run(id: string): Promise<void> {
		return Pipeline.delete(id);
	}
}

export default new DeletePipeline();
