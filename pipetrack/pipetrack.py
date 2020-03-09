import json
from itertools import groupby

start_ix = 0

def start(_ih):
    global start_ix
    start_ix = len(_ih)

def train():
    pass

def model():
    pass

def metric():
    pass

def serve():
    pass

def finish(_ih):
    global start_ix
    li = _ih[start_ix:]
    di = {}
    split_at = ['pipetrack.train()', 'pipetrack.model()', 'pipetrack.metric()', 'pipetrack.serve()']
    di['train'] = li[li.index('pipetrack.train()')+1 : li.index('pipetrack.model()')]
    di['model'] = li[li.index('pipetrack.model()')+1 : li.index('pipetrack.metric()')]
    di['metric'] = li[li.index('pipetrack.metric()')+1 : li.index('pipetrack.serve()')]
    di['serve'] = li[li.index('pipetrack.serve()')+1 : -1]

    with open('log.json', 'w') as f:
        json.dump(di, f)
