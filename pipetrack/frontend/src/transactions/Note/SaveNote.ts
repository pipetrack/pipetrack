import {TransactionScript} from '../TransactionScript';
import Note from '../../entities/Note';

class SaveNote extends TransactionScript {
	run(id: string, value: string = '') {
		Note.set(id, value);
	}
}

export default new SaveNote();
