import os
import logging
from typing import Any, Dict
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .middleware import request_id_middleware
from .services.parse_service import parse_spec_file, parse_config_file
from .services.validate_service import validate
from .schemas import ValidationResponse

logging.basicConfig(level=logging.INFO)
app = FastAPI()
app.middleware('http')(request_id_middleware)

origins = [os.getenv('WEB_ORIGIN', 'http://localhost:5173')]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

jobs: Dict[str, Dict[str, Any]] = {}

@app.post('/specs:upload')
async def upload_spec(file: UploadFile = File(...), jobId: str = 'default'):
    content = await file.read()
    spec = parse_spec_file(content, file.filename)
    job = jobs.setdefault(jobId, {})
    job['spec'] = spec
    return {'jobId': jobId, 'status': 'spec uploaded'}

@app.post('/configs:upload')
async def upload_config(file: UploadFile = File(...), jobId: str = 'default'):
    content = await file.read()
    conf = parse_config_file(content.decode())
    job = jobs.setdefault(jobId, {})
    job['conf'] = conf
    return {'jobId': jobId, 'status': 'config uploaded'}

@app.post('/validate', response_model=ValidationResponse)
async def validate_job(jobId: str = 'default'):
    job = jobs.get(jobId)
    if not job or 'spec' not in job or 'conf' not in job:
        raise HTTPException(status_code=400, detail='spec or config missing')
    return validate(job['spec'], job['conf'])
