import {TransactionScript} from '../TransactionScript';
import Pipeline from '../../entities/Pipeline';

class SetFavoritePipeline extends TransactionScript {
	run(id: string, value: '0'|'1'): Promise<void> {
		const pipelines = Pipeline.getAll();
		Object.keys(pipelines).forEach((key: string) => {
			pipelines[key].__favorite = '0';

			if (key === id) {
				pipelines[key].__favorite = value;
			}
		});

		return Pipeline.set(pipelines);
	}
}

export default new SetFavoritePipeline();
