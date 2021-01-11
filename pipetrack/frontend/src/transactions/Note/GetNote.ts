import {TransactionScript} from '../TransactionScript';
import Note from '../../entities/Note';

class GetNote extends TransactionScript {
	run(id: string) {
		return Note.get(id);
	}
}

export default new GetNote();
