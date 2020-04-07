# pipetrack
Don't make things complicated when pipelining your steps is all you need.

![trackboard](https://user-images.githubusercontent.com/32472244/78681319-43522900-78f5-11ea-8583-6c5d4abd39aa.png)

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
After executing needed steps, declare a new phase with:
```python
    pipetrack.start_phase("model_definition")
```
Finish current pipeline logging with
```python
    pipetrack.finish(_ih)
```
You can start new logging with new pipetrack.start(_ih) function call.

Please, consider using specified syntax (not ' but "; no whitespaces in code).
