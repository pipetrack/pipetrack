import SaveNote from '../transactions/Note/SaveNote';
import GetNote from '../transactions/Note/GetNote';

class NoteController {
	get notes(): Record<string, string> {
		// @ts-ignore
		return Object.keys(window.pipelineData).reduce((acc, entityId) => {
			// @ts-ignore
			acc[entityId] = window.pipelineData[entityId].__note;
			return acc;
		}, {});
	}

	getNote(id: string) {
		return GetNote.run(id);
	}

	setNote(id: string, value: string = '') {
		SaveNote.run(id, value);
	}
}

export default new NoteController();
