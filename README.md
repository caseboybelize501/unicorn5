# Synthetic Patient Data Engine

A HIPAA-compliant synthetic patient data generation engine for healthcare AI training.

## Features

- Generates realistic, statistically valid patient records
- Ensures HIPAA privacy compliance
- Supports multiple output formats (JSON, CSV)
- Statistical validity with normal distributions
- Clinical realism with ICD-10 codes and lab values

## Architecture


┌─────────────────┐
│   API Layer     │
├─────────────────┤
│  Data Generator │
├─────────────────┤
│ Statistical     │
│ Distribution    │
├─────────────────┤
│ Privacy         │
│ Compliance      │
└─────────────────┘


## Endpoints

- `POST /api/patient` - Generate single synthetic patient
- `POST /api/patients` - Generate multiple patients
- `GET /api/quality` - Get data quality report
- `GET /health` - Health check

## Usage

bash
# Start the service
npm start

# Generate 10 patients
curl -X POST http://localhost:3000/api/patients -H "Content-Type: application/json" -d '{"count": 10}'


## Data Quality

The engine ensures:
- Statistical validity with normal distributions
- HIPAA-compliant synthetic identifiers
- Realistic clinical conditions and lab results
- Valid ICD-10 diagnosis codes
- Proper vital signs ranges

## Compliance

All generated data is:
- De-identified (no real patient identifiers)
- HIPAA compliant
- Statistically valid
- Clinically realistic

## License

MIT