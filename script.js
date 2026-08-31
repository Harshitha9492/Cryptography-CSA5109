const defaultRecord = `Patient ID: P-10482
Name: Aisha Rahman
DOB: 1987-04-20
Diagnosis: Type 2 diabetes mellitus, stable
Prescription: Metformin 500 mg twice daily for 30 days
Consulting physician: Dr. Sarah Chen, MD
Facility: Horizon Cardiovascular & Wellness Clinic
Signed on: 2026-08-31`;

const messageInput = document.getElementById("messageInput");
const hashSelect = document.getElementById("hashAlgorithm");
const digestOutput = document.getElementById("digestOutput");
const signatureOutput = document.getElementById("signatureOutput");
const verificationOutput = document.getElementById("verificationOutput");
const publicKeyOutput = document.getElementById("publicKeyOutput");
const hashButton = document.getElementById("hashButton");
const signButton = document.getElementById("signButton");

messageInput.value = defaultRecord;

function hashName(value) {
  const map = {
    "SHA-256": "SHA-256",
    "SHA-384": "SHA-384",
    "SHA-512": "SHA-512",
  };

  return map[value] || "SHA-256";
}

function toHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function toBase64Url(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

async function generateDigest(content, algorithm) {
  const encoded = new TextEncoder().encode(content);
  const digestBuffer = await crypto.subtle.digest(algorithm, encoded);
  return toHex(digestBuffer);
}

async function generateKeyPair() {
  return crypto.subtle.generateKey(
    {
      name: "ECDSA",
      namedCurve: "P-256",
    },
    true,
    ["sign", "verify"]
  );
}

async function exportPublicKey(publicKey) {
  const exportData = await crypto.subtle.exportKey("spki", publicKey);
  return toBase64Url(exportData);
}

hashButton.addEventListener("click", async () => {
  const content = messageInput.value.trim();
  const algorithm = hashName(hashSelect.value);

  if (!content) {
    digestOutput.textContent = "Please enter a medical record.";
    return;
  }

  try {
    const digest = await generateDigest(content, algorithm);
    digestOutput.textContent = digest;
    verificationOutput.textContent = "Hash generated and ready for signature verification.";
  } catch (error) {
    digestOutput.textContent = "Hash generation failed. Browser may not support selected algorithm.";
    console.error(error);
  }
});

signButton.addEventListener("click", async () => {
  const content = messageInput.value.trim();
  const algorithm = hashName(hashSelect.value);

  if (!content) {
    signatureOutput.textContent = "Please enter a medical record before signing.";
    return;
  }

  try {
    const keyPair = await generateKeyPair();
    const publicKeyData = await exportPublicKey(keyPair.publicKey);
    const encoded = new TextEncoder().encode(content);
    const signature = await crypto.subtle.sign(
      {
        name: "ECDSA",
        hash: algorithm,
      },
      keyPair.privateKey,
      encoded
    );

    const signatureHex = toHex(signature);
    const isValid = await crypto.subtle.verify(
      {
        name: "ECDSA",
        hash: algorithm,
      },
      keyPair.publicKey,
      signature,
      encoded
    );

    signatureOutput.textContent = signatureHex;
    publicKeyOutput.textContent = `P-256 public key prefix: ${publicKeyData.slice(0, 32)}...`;
    verificationOutput.textContent = isValid
      ? "Signature verified successfully. Document integrity and source authenticity confirmed."
      : "Signature verification failed.";
    verificationOutput.classList.add("status");
  } catch (error) {
    signatureOutput.textContent = "Signature generation failed in this browser environment.";
    verificationOutput.textContent = "Could not verify signature.";
    console.error(error);
  }
});
