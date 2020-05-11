from setuptools import setup, find_packages

with open("README.md", "r") as readme_file:
    readme = readme_file.read()

setup(
    name="pipetrack",
    version="0.2.8rc77",
    author="Atamanyuk Andrew & Gadzhiev Kirill",
    description="Package for tracking steps of your ML projects",
    long_description=readme,
    long_description_content_type="text/markdown",
    url="https://github.com/pipetrack/pipetrack",
    packages=find_packages(),
    classifiers=[
        "Programming Language :: Python :: 3.7",
        "License :: OSI Approved :: GNU General Public License v3 (GPLv3)",
    ],
    package_data={'pipetrack': ['frontend/build/static/js/main.js', 'frontend/build/static/js/main.js', 'frontend/build/static/css/*.css', 'pipetrack/backend', 'pipetrack/frontend']}
)
