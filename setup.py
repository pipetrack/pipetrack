from setuptools import setup, find_namespace_packages

with open("README.md", "r") as readme_file:
    readme = readme_file.read()

setup(
    name="pipetrack",
    version="0.0.8",
    author="Atamanyuk Andrew & Gajiev Kirill",
    description="A package to track steps of your ML projects",
    long_description=readme,
    long_description_content_type="text/markdown",
    url="https://github.com/pipetrack/pipetrack",
    package_dir={"": "pipetrack"},
    packages=find_namespace_packages(where="pipetrack"),
    classifiers=[
        "Programming Language :: Python :: 3.7",
        "License :: OSI Approved :: GNU General Public License v3 (GPLv3)",
    ],
)
