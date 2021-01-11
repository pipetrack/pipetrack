import React, {useEffect} from 'react';
import './App.css';
import PipelineComponent, {IPipeline} from '../PipelineComponent/PipelineComponent';
import Integration from '../../transactions/Integration/Integration';
import SavePipelines from '../../transactions/Pipeline/SavePipelines';
import GetPipelines from '../../transactions/Pipeline/GetPipelines';
import PipelineController from '../../controllers/PipelineController';
import IntegrationController from '../../controllers/IntegrationController';

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

        SavePipelines.run(newPipelines);
    };

    const setFavorite = (id: string, state: string) => {
        const newPipelines = {...pipelines};
        Object.keys(newPipelines).forEach((key) => {
            if (!newPipelines[key]) return;

            newPipelines[key].__favorite = '0'
        });
        newPipelines[id].__favorite = state;

        setPipelines(newPipelines);

        // SavePipelines.run(newPipelines);
    };

    const removePipeline = (id: number) => {
        const newPipelines = {...pipelines,};
        if (newPipelines[id]) {
            delete newPipelines[id];
        }

        setPipelines(newPipelines);
        SavePipelines.run(newPipelines);
    };

    useEffect(() => {
        try {
            IntegrationController.integrate().then(() => {
                setPipelines(PipelineController.pipelineList);
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
                    <PipelineComponent key={id}
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
