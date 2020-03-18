"""This module is made for defining a bunch of functions
for logging pipelines.
"""
import json

__start_ix = 0
__list_of_phases = []

def start(_ih:list = None):
    if _ih is None:
        raise Exception("Input caching variable '_ih' must be passed")
    else:
        global __start_ix
        __start_ix = len(_ih)

def start_phase(name:str = None):
    if name is None:
        raise Exception("Name of current phase must be passed")
    else:
        global __list_of_phases
        __list_of_phases.append(name)


def finish(_ih:list = None):
    if _ih is None:
        raise Exception("Input caching variable '_ih' must be passed")
    else:
        global __start_ix
        global __list_of_phases
        ih = _ih[__start_ix:]
        di = {}
        for i in range(len(__list_of_phases)):
            try:
                df[name] = ih[
                ih.index(f'pipetrack.start_phase("{__list_of_phases[i]}")')+1 :
                ih.index(f'pipetrack.start_phase("{__list_of_phases[i+1]}")')
                ]
            except IndexError:
                di[name] = ih[
                ih.index(f'pipetrack.start_phase("{__list_of_phases[i]}")')+1 :
                -1]

        with open('log.json', 'w') as f:
            json.dump(di, f)
