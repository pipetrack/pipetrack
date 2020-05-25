import * as React from 'react';
import './App.css';
import Pipeline, {IPipeline} from '../Pipeline/Pipeline';
import {useEffect} from 'react';
import executePython from '../../utils/executePython';
import appSnippet from '../../snippets/appSnippet';

// ключ - номер пайплайна, значение - IPipeline
// @ts-ignore
const mock: Record<string, IPipeline> = {"0": {__favorite: '1', __note: "", __result: "0.5", __order: ["MOCK!!!!!!!!!!!", "model", "metric", "serve"], "MOCK!!!!!!!!!!!": ["test = 10", "more", "for i in range(10):\n    for _ in range(3):\n        print('some')"], "model": ["'model'"], "metric": ["'metric'"], "serve": []}, "1": {__favorite: '0', __note: "", __result: "0.6", __order: ["train"], train: ["eeeee"]}};

function App() {
    //@ts-ignore
    const useAppClass = !window.isProduction;
    const [pipelines, setPipelines] = React.useState<Record<string, IPipeline>>({});

    const setNote = (id: string, note: string) => {
        const newPipelines = {...pipelines};
        newPipelines[id].__note = note;

        setPipelines(newPipelines);

        executePython(`display(Javascript("window.pipelineData = ${JSON.stringify(newPipelines)}"))`);
        //@ts-ignore
        // window.pipelineData = newPipelines;
    };

    const setFavorite = (id: string, state: string) => {
        const newPipelines = {...pipelines};
        Object.keys(newPipelines).forEach((key) => {
            if (!newPipelines[key]) return;

            newPipelines[key].__favorite = '0'
        });
        newPipelines[id].__favorite = state;

        setPipelines(newPipelines);

        executePython(`display(Javascript("window.pipelineData = ${JSON.stringify(newPipelines)}"))`);
        // //@ts-ignore
        // window.pipelineData = newPipelines;
    };

    const removePipeline = (id: number) => {
        const newPipelines = {...pipelines,};
        if (newPipelines[id]) {
            delete newPipelines[id];
        }

        setPipelines(newPipelines);
        //@ts-ignore
        executePython(`display(Javascript("window.pipelineData = ${JSON.stringify(newPipelines)}"))`);
    };

    useEffect(() => {
        try {
            executePython(appSnippet).then(() => {
                //@ts-ignore
                const parsed = window.pipelineData;
                // const parsed = JSON.parse(window.pipelineData?.replace(/\n/g, ''));
                setPipelines(parsed);
            }).catch(console.log);


        } catch (e) {
            setPipelines(mock);
            console.log(e);
        }
    }, []);

    return (
        <div className={useAppClass ? 'App_dev' : 'App_prod'}>
            {
                Object.entries(pipelines).map(([id, pipeline]) =>
                    <Pipeline key={id}
                              id={id}
                              pipeline={pipeline}
                              setFavorite={setFavorite}
                              setNote={setNote}
                              removePipeline={removePipeline}
                    />)
            }
        </div>
    );
}

export default App;
