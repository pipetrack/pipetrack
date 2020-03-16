# pipetrack
Don't make things complicated when pipelining your steps is all you need.

### Usage example:
```python
    import pipetrack
```
You can start logging your steps with:
```python
    pipetrack.start(_ih)
```
You can start new pipeline phase with:
```python
    pipetrack.start_phase("train data processing")
```
or
```python
    pipetrack.start_phase("model_definition")
```
Finish current pipeline logging with
```python
    pipetrack.finish(_ih)
```

Please, consider using specified syntax (not ', but "; no whitespaces in code).
