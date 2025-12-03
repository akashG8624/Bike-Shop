# Use an official Python base image
FROM python:3.14

# Set working directory inside container
WORKDIR /app

# Copy project files into container
COPY api /app/api
COPY bikeShop /app/bikeShop
COPY media /app/media
COPY db.sqlite3 /app/db.sqlite3
COPY manage.py /app/manage.py
COPY requirements.txt /app/requirements.txt

# Install dependencies
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Expose the port Django runs on
EXPOSE 8000

# Start the Django server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
