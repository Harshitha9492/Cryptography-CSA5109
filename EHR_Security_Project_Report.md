# Evaluation of Cryptographic Hash Functions and Digital Signatures in Electronic Health Record Security

## 1. Problem Statement and Problem Formulation

Electronic Health Records (EHRs) contain highly sensitive information, including patient diagnostics, treatment plans, prescriptions, and medical history. In a telemedicine environment, these records are exchanged between hospitals, doctors, laboratories, and insurance systems. The health network must ensure that the records remain confidential, unaltered during transmission, and attributable to the correct healthcare provider.

The core problem is to secure EHR exchange against unauthorized modification and impersonation. If a medical record is altered without detection, the consequences can include incorrect prescriptions, false diagnoses, legal disputes, and patient safety risks. Therefore, the system must provide:

- integrity assurance,
- source authentication,
- non-repudiation,
- auditability,
- resilience to collision and tampering attacks.

This project addresses the problem by designing and implementing a secure EHR workflow using cryptographic hash functions and digital signatures. It evaluates the practical effectiveness of SHA-256, SHA3-256, and RSA-PSS signatures for authenticating and verifying medical records.

## 2. Objective and Expected Outcomes

### Objective
The main objective of this project is to design and implement a secure healthcare document protection system that demonstrates how cryptographic hash functions and digital signatures protect Electronic Health Records during transmission and storage.

### Expected Outcomes
The project aims to achieve the following:

- generate cryptographic hashes for EHR content,
- generate RSA public/private key pairs,
- create a digital signature for the EHR,
- verify the authenticity and integrity of signed medical documents,
- simulate malicious changes and detect tampering,
- evaluate hash and signature performance,
- recommend a secure protocol deployment model for healthcare information exchange.

## 3. Requirements, Constraints and Assumptions

### Requirements
- Implement a responsive web application using HTML, CSS, JavaScript, and Flask.
- Accept dummy EHR data only.
- Generate SHA-256 and SHA3-256 hashes.
- Generate RSA-3072 keys.
- Sign EHR content using RSA-PSS with SHA-256.
- Verify the digital signature.
- Support tampering simulation and detection.
- Display audit log and security evaluation.
- Provide a final recommendation for secure protocol deployment.

### Constraints
- Use dummy records only; no real patient information.
- Keep the system suitable for a college project demonstration.
- Ensure the solution remains understandable and easy to run locally in VS Code.
- Use open-source and commonly available libraries such as Python Flask and cryptography.

### Assumptions
- The sender and receiver have access to valid public/private key material.
- The public key is shared securely through a trusted certificate or key distribution channel.
- The application is intended for educational and demo purposes, not for production health information exchange without further hardening.

## 4. Application of Relevant Course Knowledge / Concepts

This project applies core concepts from cryptography and network security, especially:

- hash functions,
- collision resistance,
- digital signatures,
- public-key cryptography,
- message integrity,
- source authentication,
- non-repudiation,
- cryptographic resilience,
- security trade-offs in performance and usability.

### Relevant Concepts Used

1. Hash Functions
   - Hashing converts arbitrary electronic health record content into a fixed-length digest.
   - Even a small change in the medical record causes a completely different hash output.

2. Collision Resistance
   - A strong hash function should make it computationally infeasible to find two distinct messages with the same digest.
   - This is essential for EHR integrity.

3. Public-Key Cryptography
   - RSA public/private keys enable asymmetric signing and verification.
   - The private key signs the message; the public key verifies it.

4. Digital Signature Scheme
   - RSA-PSS is used to demonstrate authenticated medical document signing.
   - This ensures that the document comes from a trusted source and has not been altered.

5. Integrity and Authentication
   - Integrity means detecting changes in EHR content.
   - Authentication means verifying the identity of the sender.

6. Non-Repudiation
   - Because only the sender’s private key could create the signature, the sender cannot later deny signing the record.

## 5. Design / Proposed Solution / Methodology

The system follows a secure EHR exchange lifecycle:

1. The healthcare professional enters patient data and a prescription in an EHR form.
2. A canonical payload string is generated from the record fields.
3. The payload is hashed using SHA-256 and SHA3-256.
4. RSA-3072 key pairs are generated.
5. The payload is signed using RSA-PSS with SHA-256.
6. The recipient verifies the signature using the public key.
7. If the message is modified, the hash changes and the signature fails verification.
8. The system records all events in an audit log.

### Methodological Design

- Frontend: HTML, CSS, JavaScript
- Backend: Flask
- Cryptography library: Python cryptography package
- Security workflow: create EHR -> hash -> sign -> verify -> audit/tamper check

This design is suitable for educational demonstration because it makes the security operations visible and easy to interpret.

## 6. Algorithm / Pseudocode / Flowchart

### Algorithm

1. Collect EHR fields from the form.
2. Build a canonical payload string.
3. Compute SHA-256 and SHA3-256 digests.
4. Generate RSA-3072 public/private key pair.
5. Sign the payload using RSA-PSS and SHA-256.
6. Verify the signature using the public key.
7. If tampering is simulated, alter the prescription field and recompute the hash.
8. Detect mismatch between original and modified digests.
9. Show integrity, authentication, digital signature, and tampering status.

### Pseudocode

```text
INPUT: EHR fields

payload = combine_fields(fields)
hash1 = SHA256(payload)
hash2 = SHA3_256(payload)
(public_key, private_key) = RSA_3072.generate()
signature = RSA_PSS_SIGN(private_key, payload, SHA256)
verification = RSA_PSS_VERIFY(public_key, signature, payload, SHA256)

if verification == TRUE:
    status = "Verified"
else:
    status = "Failed"

modified_payload = change_prescription(payload)
modified_hash = SHA256(modified_payload)
if modified_hash != hash1:
    tampering_detected = TRUE
else:
    tampering_detected = FALSE

OUTPUT: hashes, signature, verification status, tampering result
```

### Flowchart Concept

EHR Form -> Payload Generation -> Hashing -> Key Generation -> Digital Signing -> Verification -> Tamper Simulation -> Audit Log -> Results

## 7. Implementation / Source Code and Environment / Tools Used

### Tools and Environment
- Python 3.11+
- Flask 3.0.3
- cryptography 42.0.8
- HTML5
- CSS3
- JavaScript
- VS Code
- Windows 11
- Local server via Flask development server / Gunicorn for deployment-style testing

### Source Code Summary
The implementation includes:

- Flask routes for EHR processing and tampering checks,
- cryptographic helper utility functions for hashing, signing, and verification,
- browser-based UI for entering EHR records and showing outcomes,
- JavaScript logic for dynamic display of results and audit events.

### Key Implementation Ideas
- The EHR fields are converted into a canonical text payload.
- Hashing is performed before signing to create a digest representative of the exact content.
- The signed document is verified using the matching public key.
- Tampering detection relies on comparing the original and modified hashes.

## 8. Test Cases and Expected/Actual Results

| Test Case | Description | Expected Result | Actual Result |
|---|---|---|---|
| TC1 | Generate SHA-256 hash | Unique digest displayed | Pass |
| TC2 | Generate SHA3-256 hash | Unique digest displayed | Pass |
| TC3 | Generate RSA key pair | 3072-bit keys created | Pass |
| TC4 | Sign EHR payload | Valid signature created | Pass |
| TC5 | Verify signature | Signature valid | Pass |
| TC6 | Simulate tampering | Hash mismatch and tampering detection | Pass |
| TC7 | Frontend form validation | Accept EHR data and show results | Pass |

### Verified Runtime Evidence
The project was tested locally in the working environment. The actual cryptographic verification output was:

- process True Verified Valid
- tamper True Detected

This confirms that the signed EHR validated correctly and that the tampering simulation was detected.

## 9. Execution Screenshots / Outputs

The final website includes a healthcare dashboard, EHR form, results summary, hash values, signature output, audit log, and security evaluation panels. The interface was validated through the local running application and by API calls to the Flask backend.

Representative outputs observed:

- Integrity: Verified
- Authentication: Verified
- Digital Signature: Valid
- Tampering: Detected

These outputs confirm the secure end-to-end workflow.

## 10. Results and Validation – Appropriate Tables, Graphs, Performance Metrics, Experimental Observations

### Security Result Summary

| Security Criterion | Result |
|---|---|
| Integrity Assurance | Strong |
| Authentication Capability | Strong |
| Non-Repudiation | Supported |
| Collision Resistance | High for SHA-256 / SHA3-256 |
| Computational Overhead | Moderate due to RSA signing |
| Cryptographic Resilience | Strong for educational deployment |

### Validation Observations

- Hash mismatch after tampering confirmed the integrity mechanism.
- Verified EHR signature proved the message was signed by the corresponding private key.
- RSA-PSS with SHA-256 is a practical and reliable combination for demonstration and small-scale secure document exchange.

### Performance Evaluation Note
The dashboard includes timing measurements for SHA-256, SHA3-256, RSA signing, and RSA verification. The exact values vary by machine, but the system clearly demonstrates that hashing is lighter than RSA operations, while signature verification remains practical for EHR-level transactions.

## 11. Analysis, Comparison, Trade-offs and Justification of the Final Solution

### Hash Comparison

| Algorithm | Security Strength | Advantages | Drawbacks |
|---|---|---|---|
| SHA-256 | Strong | Widely used, efficient, mature | Slightly less future-proof than SHA3 |
| SHA3-256 | Strong | Modern design, secure alternative | Less widespread adoption |
| SHA-1 | Weak | Legacy support | Practical collision attacks exist |

### Signature Comparison

| Signature Scheme | Security Level | Notes |
|---|---|---|
| RSA-PSS | Strong | Reliable and widely accepted |
| ECDSA | Strong | Efficient, smaller keys |
| Ed25519 | Very strong | Fast and compact |

### Trade-offs
- SHA-256 is preferred for compatibility and operational maturity.
- SHA3-256 is a valid choice for modern systems but is less universally deployed.
- RSA-PSS offers strong authenticity but has higher computational cost than symmetric primitives.
- For EHR exchange, the selection of SHA-256 + RSA-PSS provides a balanced, understandable, and secure demonstration.

### Justification
The final solution chooses SHA-256 for hashing and RSA-PSS for signing because it offers a good balance of security, performance, and clarity in an educational project. It is suitable for demonstrating how medical documents can be authenticated and integrity-checked before use in healthcare systems.

## 12. Broader Considerations / SDG Relevance

This project contributes to the broader goal of secure, trustworthy digital healthcare. It aligns with sustainable and ethical development goals by supporting the safe use of digital health infrastructure.

Relevant considerations include:

- improved patient safety through data integrity,
- increased trust in digital medical systems,
- secure telemedicine communication,
- reduced fraud and document tampering,
- support for transparent healthcare record exchange.

The project demonstrates how digital security technologies can support equitable and reliable healthcare access while protecting sensitive patient information.

## 13. Conclusion, Limitations and Possible Improvements

### Conclusion
This project demonstrates how cryptographic hash functions and digital signatures can protect Electronic Health Records in a telemedicine healthcare ecosystem. By combining SHA-256 and RSA-PSS, the system provides an understandable and effective model for integrity assurance, source authentication, and tamper detection.

### Limitations
- The project uses dummy data rather than real clinical records.
- The application does not yet implement full certificate authority infrastructure.
- Keys are generated in memory for demonstration rather than stored securely in a production-grade hardware or cloud keystore.
- The architecture is suited for a demonstration system, not a fully regulated production healthcare environment.

### Possible Improvements
- integrate certificate-based identity management,
- add database-backed audit logs,
- store keys securely using HSM or cloud key vault,
- support HTTPS and deployment in a secure environment,
- implement multi-factor access control,
- compare RSA-PSS with ECDSA and Ed25519 in a more detailed study.

## 14. Individual Contribution of Group Members

| Group Member | Role | Contribution |
|---|---|---|
| Member 1 | Project Lead | Project planning, system design, report preparation |
| Member 2 | Frontend Developer | UI/UX design, dashboard layout, responsive styling |
| Member 3 | Backend / Cryptography Developer | Flask backend, hash generation, signing/verification logic |
| Member 4 | Testing and Validation | Test execution, result analysis, documentation |

Note: Replace member names and responsibilities with actual group member details as required.

## 15. References

1. National Institute of Standards and Technology (NIST). FIPS 180-4: Secure Hash Standard. 2015.
2. National Institute of Standards and Technology (NIST). FIPS 202: SHA-3 Standard: Permutation-Based Hash and Extendable-Output Functions. 2015.
3. Rivest, R., Shamir, A., and Adleman, L. "A Method for Obtaining Digital Signatures and Public-Key Cryptosystems." Communications of the ACM, 1978.
4. Menezes, A., van Oorschot, P., and Vanstone, S. Handbook of Applied Cryptography. CRC Press, 1996.
5. Stallings, W. Cryptography and Network Security: Principles and Practice. Pearson, latest edition.
6. Python cryptography library documentation. https://cryptography.io/
7. Flask documentation. https://flask.palletsprojects.com/

## 16. One-Page Individual Reflection

This project helped me understand the practical significance of cryptographic security in healthcare systems. Before working on it, I knew the basic concepts of hashing and digital signatures, but this project made it clear how those principles protect real-world systems like EHR exchange. I learned that security is not only about choosing a strong algorithm but also about designing a workflow where data can be validated, authenticated, and audited.

The most valuable part of this project was the combination of theory and implementation. I could see how a tiny change in a prescription or diagnosis changes the hash output, and how a valid digital signature proves that the message originated from a trusted source. This gave me a clearer understanding of integrity, authenticity, and non-repudiation in digital systems.

I also learned that healthcare security is a trade-off between protection and usability. Strong algorithms like SHA-256 and RSA-PSS are effective, but they require careful key management, secure hosting, and transparent audit mechanisms. In real deployments, security must be combined with legal, operational, and compliance requirements.

Overall, the project improved my understanding of cryptography in practical application and strengthened my confidence in designing secure digital systems. It also showed me that even a small demo application can illustrate deeply important concepts in health information security.

---

End of report
