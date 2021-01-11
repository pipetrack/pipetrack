export default (python: string) => {
    return new Promise((resolve) => {
        const callbacks = {
            iopub: {
                output: (data: any) => resolve(data)
            }
        };

        // @ts-ignore
        resolve(Jupyter.notebook.kernel.execute(python, callbacks));
    }).then((res: any) => {
        // console.log(res);
        // console.log(JSON.stringify(res));
        // console.log(JSON.stringify(Object.keys(res)));
    }).catch((res: any) => {
        // console.log(res);
        // console.log(JSON.stringify(res));
        // console.log(JSON.stringify(Object.keys(res)));
    }).finally(() => {
        console.log('FINALLY');
    })
}

export const execute = (code: string) => {
	console.trace(code);
	return Promise.resolve();
};
