import {TransactionScript} from '../TransactionScript';
import Pipeline from '../../entities/Pipeline';
import {IPipeline} from '../../components/PipelineComponent/PipelineComponent';

class SetFavoritePipeline extends TransactionScript {
	run(id: string, value: '0'|'1'): Promise<void> {
		const pipelines = Pipeline.getAll();
		const updated = this.updateIsFavorite(pipelines, id, value);

		return Pipeline.set(updated);
	}

	updateIsFavorite(pipelines: Record<string, IPipeline>, id: string, value: '0' | '1'): Record<string, IPipeline> {
		if (!pipelines || typeof pipelines !== 'object') {
			throw new Error('Pipelines must be an object with type Record<string, IPipeline>');
		}

		const result: Record<string, IPipeline> = {};
		const keys = Object.keys(pipelines);

		if (!keys.includes(id)) {
			throw new Error(`Pipeline with id="${id}" is not exist in given pipelines`);
		}

		if (!['0', '1'].includes(value)) {
			throw new Error(`Expected value = '0' or '1', but given value=${value}`);
		}

		keys.forEach((key: string) => {
			const pipeline = pipelines[key];

			if (!pipeline || typeof pipeline !== 'object') {
				throw new Error(`Pipeline with id="${id}" has incorrect value`);
			}

			result[key] = {...pipeline};
			result[key].__favorite = '0';

			if (key === id) {
				result[key].__favorite = value;
			}
		});

		return result;
	}
}

export default new SetFavoritePipeline();
