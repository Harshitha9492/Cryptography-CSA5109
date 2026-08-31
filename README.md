# Evaluation of Cryptographic Hash Functions and Digital Signatures in Electronic Health Record Security

This project demonstrates how cryptographic hash functions and digital signatures can be applied to Electronic Health Records (EHR) to ensure integrity, authentication, and non-repudiation in a healthcare exchange environment.

## Features

- Responsive healthcare security dashboard
- EHR form for patient records, diagnosis, prescription, doctor, hospital, date, and notes
- SHA-256 and SHA3-256 hashing of the generated EHR content
- RSA-3072 key generation
- RSA-PSS digital signing with SHA-256
- Signature verification
- Tampering simulation that changes the prescription and detects modification
- Audit log for hashing, signing, verification, and tampering attempts
- Performance evaluation section comparing hashing and RSA time
- Security evaluation section with recommended deployment guidance

## Project structure

```text
project-root/
├── app/
│   ├── __init__.py
│   ├── routes.py
│   ├── cryptography_utils.py
│   ├── templates/
│   │   └── index.html
│   └── static/
│       ├── css/
│       │   └── style.css
│       └── js/
│           └── app.js
├── requirements.txt
├── README.md
├── run.py
└── .gitignore
```

## Install dependencies

```bash
python -m venv venv
source venv/bin/activate   # Linux/macOS
# or
venv\Scripts\activate      # Windows
pip install -r requirements.txt
```

## Run the app locally

```bash
python run.py
```

Then visit:

```text
http://127.0.0.1:5000
```

## Run with Gunicorn for deployment-style testing

```bash
gunicorn --bind 0.0.0.0:8000 run:app
```

## Test EHR hashing

1. Open the application in the browser.
2. Fill in demo EHR data.
3. Click "Generate Hashes".
4. Compare the SHA-256 and SHA3-256 digests shown on the page.

## Test digital signature verification

1. Complete the EHR form.
2. Click "Generate Keys & Sign".
3. Review the RSA public/private keys and digital signature.
4. Click "Verify Signature" to check validity.

## Demonstrate tampering detection

1. Generate a valid signature.
2. Click "Simulate Tampering".
3. The prescription field will be modified and the hash/signature will fail verification.
4. The UI should show corruption is detected and the tampering flag is triggered.

## Production deployment notes

This project is suitable for a local demonstration and deployment-style testing. For production deployment, use a secure host, HTTPS, proper environment variables, and a production WSGI server such as Gunicorn.

### Recommended deployment targets

- Render
- Railway
- Azure App Service
- DigitalOcean App Platform
- VPS with Nginx + Gunicorn

## GitHub upload

```bash
git init
git add .
git commit -m "Initial commit: EHR security project"
git branch -M main
git remote add origin <your-repository-url>
git push -u origin main
```

## Notes

- All data used is dummy sample data only.
- No real patient or personal medical information is stored.
- The implementation uses Python's `cryptography` package and Flask for the end-to-end demonstration.
