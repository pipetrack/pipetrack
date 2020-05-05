"""This module is made for defining a bunch of functions
for logging pipelines.
"""
import json
import os


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
            name = __list_of_phases[i]
            try:
                di[__list_of_phases[i]] = ih[
                ih.index(f'pipetrack.start_phase("{__list_of_phases[i]}")')+1 :
                ih.index(f'pipetrack.start_phase("{__list_of_phases[i+1]}")')
                ]
            except IndexError:
                di[__list_of_phases[i]] = ih[
                ih.index(f'pipetrack.start_phase("{__list_of_phases[i]}")')+1 :
                -1]

        di['favorite'] = None
        di['note'] = str

        with open('log.json') as f:
            all_log = json.load(f)

        last_key = max(log.keys())

        this_log[last_key+1] = di

        all_log.update(this_log)

        with open('log.json', 'w') as f:
            json.dump(all_log)
