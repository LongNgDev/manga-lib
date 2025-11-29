# 🩵 worker/Dockerfile
FROM python:3.12-slim

# set working dir
WORKDIR /app

# copy requirement list first (for cache)
COPY requirements.txt .

# install deps quietly
RUN pip install --no-cache-dir -r requirements.txt

# then copy your code
COPY . .

# run script
# CMD ["python", "main.py"]
