"""This module is made for defining a bunch of functions
for logging pipelines.
"""
import json
import os


class Track():

    __start_ix = 0
    __list_of_phases = []

    def start(_ih:list = None):
        if _ih is None:
            raise Exception("Input caching variable '_ih' must be passed")
        else:
            self.__start_ix = len(_ih)

    def start_phase(name:str = None):
        if name is None:
            raise Exception("Name of current phase must be passed")
        else:
            self.__list_of_phases.append(name)


    def finish(_ih:list = None):
        if _ih is None:
            raise Exception("Input caching variable '_ih' must be passed")
        else:
            ih = _ih[self.__start_ix:]
            di = {}
            for first,second in zip(self.__list_of_phases, self.__list_of_phases[1:])):
                if second is None:
                    di[first] = ih[
                    ih.index(f'pipetrack.start_phase("{first}")')+1 :
                    -1]
                else:
                    di[second] = ih[
                    ih.index(f'pipetrack.start_phase("{first}")')+1 :
                    ih.index(f'pipetrack.start_phase("{second}")')
                    ]

            with open('log.json', 'w') as f:
                json.dump(di, f)
