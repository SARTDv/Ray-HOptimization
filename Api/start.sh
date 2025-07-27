#!/bin/sh
ray start --head --port=6379
python app.py
