import * as React from 'react';
import './App.css';
import Pipeline, {IPipeline} from '../Pipeline/Pipeline';
import {useEffect} from 'react';
import executePython from '../../utils/executePython';

// ключ - номер пайплайна, значение - IPipeline
// @ts-ignore
const mock: Record<string, IPipeline> = {"0": {favorite: '1', note: "", "MOCK!!!!!!!!!!!": ["test = 10", "more", "for i in range(10):\n    for _ in range(3):\n        print('some')"], "model": ["'model'"], "metric": ["'metric'"], "serve": []}, "1": {favorite: '0', note: "", train: ["eeeee"]}};

function App() {
    //@ts-ignore
    const useAppClass = !window.isProduction;
    const [pipelines, setPipelines] = React.useState<Record<string, IPipeline>>({});

    const setFavorite = (id: string, state: string) => {
        const newPipelines = {...pipelines};
        Object.keys(newPipelines).forEach((key) => {
            if (!newPipelines[key]) return;

            newPipelines[key].favorite = '0'
        });
        newPipelines[id].favorite = state;

        setPipelines(newPipelines);

        executePython(`display(Javascript("window.pipelineData = ${JSON.stringify(newPipelines)}"))`);
        // //@ts-ignore
        // window.pipelineData = newPipelines;
    };

    useEffect(() => {
        try {
            //@ts-ignore
            const parsed = window.pipelineData;
            // const parsed = JSON.parse(window.pipelineData?.replace(/\n/g, ''));
            setPipelines(parsed);
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
                    />)
            }
        </div>
    );
}

export default App;
