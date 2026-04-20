# Backend + static simulator assets. Build from repository root:
#   docker build -t aquacool-api .
# Flask uses ../frontend relative to backend/ → layout must be /app/backend and /app/frontend.

FROM python:3.11-slim-bookworm

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    OPENBLAS_NUM_THREADS=1 \
    OMP_NUM_THREADS=1 \
    MKL_NUM_THREADS=1 \
    VECLIB_MAXIMUM_THREADS=1 \
    NUMEXPR_NUM_THREADS=1 \
    FLASK_ENV=production \
    PIP_NO_CACHE_DIR=1

COPY backend/requirements.txt /app/backend/requirements.txt
RUN pip install --upgrade pip setuptools wheel \
    && pip install -r /app/backend/requirements.txt

COPY backend /app/backend
COPY frontend /app/frontend

WORKDIR /app/backend

EXPOSE 5001

# Render / Fly / Railway set PORT; default for local `docker run -p 5001:5001`
ENV PORT=5001

CMD gunicorn app:app --bind 0.0.0.0:${PORT} --workers 1 --threads 2 --timeout 120
