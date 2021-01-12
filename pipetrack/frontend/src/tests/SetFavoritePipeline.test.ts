import SetFavoritePipeline from '../transactions/Pipeline/SetFavoritePipeline';

const copy = obj => JSON.parse(JSON.stringify(obj));

const PIPELINES_MOCK = {
	"0": {
		__favorite: '1',
		__note: "",
		__result: "0.5",
		__order: ["MOCK!!!!!!!!!!!", "model", "metric", "serve"],
		"MOCK!!!!!!!!!!!": [
			"test = 10",
			"more",
			"for i in range(10):\n    for _ in range(3):\n        print('some')"
		],
		"model": ["'model'"],
		"metric": ["'metric'"],
		"serve": []
	},
	"1": {
		__favorite: '0',
		__note: "",
		__result: "0.6",
		__order: ["train"],
		train: ["eeeee"]
	}
};


describe('SetFavoritePipeline', () => {
	describe('updateIsFavorite', () => {
		test('incorrect "pipelines" value => throw err', () => {
			expect(() => SetFavoritePipeline.updateIsFavorite(null, null, null)).toThrow(/Pipelines must be an object/);
		});

		test('incorrect "id" value => throw err', () => {
			expect(() => SetFavoritePipeline.updateIsFavorite(PIPELINES_MOCK, '5', null)).toThrow(/not exist/);
		});

		test('incorrect "value" value => throw err', () => {
			expect(() => SetFavoritePipeline.updateIsFavorite(PIPELINES_MOCK, '0', true)).toThrow(/Expected value/);
		});

		test('incorrect value of some "pipelines" => throw err', () => {
			const pipelines = {
				...PIPELINES_MOCK,
				"2": null
			};
			expect(() => SetFavoritePipeline.updateIsFavorite(pipelines, '0', '0')).toThrow(/Pipeline with id/);
		});

		test('correctly unset favorite', () => {
			const expected = copy(PIPELINES_MOCK);
			expected['0'].__favorite = '0';
			const actual = SetFavoritePipeline.updateIsFavorite(PIPELINES_MOCK, '0', '0');

			expect(actual).toStrictEqual(expected);
		});

		test('correctly set favorite', () => {
			const given = copy(PIPELINES_MOCK);
			given['0'].__favorite = '0';
			const expected = PIPELINES_MOCK;
			const actual = SetFavoritePipeline.updateIsFavorite(given, '0', '1');

			expect(actual).toStrictEqual(expected);
		});

		test('do nothing if already favorite', () => {
			const expected = PIPELINES_MOCK;
			const actual = SetFavoritePipeline.updateIsFavorite(PIPELINES_MOCK, '0', '1');

			expect(actual).toStrictEqual(expected);
		});

		test('correctly unset other', () => {
			const expected = copy(PIPELINES_MOCK);
			expected['0'].__favorite = '0';
			expected['1'].__favorite = '1';
			const actual = SetFavoritePipeline.updateIsFavorite(PIPELINES_MOCK, '1', '1');

			expect(actual).toStrictEqual(expected);
		});
	});
});
