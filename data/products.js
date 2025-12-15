const categories = ['Instruments', 'Consumables', 'Diagnostics', 'Protective', 'Medications']

function randPrice(i){
  const base = 5 + (i % 50) * 3.7
  return (Math.round((base + (i % 13) * 2.13) * 100) / 100)
}

const productNames = {
  Instruments: [
    'Surgical Scalpel Set', 'Dental Forceps', 'Stethoscope', 'Blood Pressure Monitor', 'Thermometer',
    'Otoscope', 'Ophthalmoscope', 'Syringe Pump', 'Defibrillator', 'ECG Machine',
    'Ultrasound Scanner', 'X-Ray Machine', 'MRI Scanner', 'CT Scanner', 'Endoscope',
    'Laparoscope', 'Colonoscope', 'Bronchoscope', 'Cystoscope', 'Hysteroscope',
    'Arthroscope', 'Laryngoscope', 'Ophthalmic Lens', 'Dental Drill', 'Orthopedic Hammer'
  ],
  Consumables: [
    'Surgical Gloves', 'Face Masks', 'Bandages', 'Gauze Pads', 'Syringes',
    'Needles', 'IV Catheters', 'Blood Bags', 'Urine Bags', 'Oxygen Masks',
    'Wound Dressings', 'Adhesive Tapes', 'Cotton Swabs', 'Alcohol Swabs', 'Disinfectants',
    'Hand Sanitizers', 'Soap Solutions', 'Lubricants', 'Catheter Tubes', 'Drainage Bags',
    'Suture Materials', 'Staples', 'Bone Cement', 'Contrast Media', 'Electrode Pads'
  ],
  Diagnostics: [
    'Blood Test Kits', 'Urine Test Strips', 'Pregnancy Tests', 'Glucose Meters', 'Cholesterol Tests',
    'HIV Test Kits', 'Hepatitis Tests', 'Thyroid Tests', 'Allergy Tests', 'Influenza Tests',
    'COVID-19 Tests', 'Tumor Markers', 'Hormone Assays', 'Microbiology Cultures', 'Histopathology Kits',
    'Immunoassay Kits', 'Molecular Diagnostics', 'Genetic Testing', 'Biopsy Needles', 'Endoscopic Biopsy'
  ],
  Protective: [
    'N95 Masks', 'Surgical Gowns', 'Face Shields', 'Gloves', 'Shoe Covers',
    'Hair Nets', 'Aprons', 'Eyewear', 'Respirators', 'Hazmat Suits',
    'Isolation Gowns', 'Boot Covers', 'Head Covers', 'Mouthpieces', 'Ear Plugs',
    'Radiation Shields', 'Lead Aprons', 'Thyroid Shields', 'Gonadal Shields', 'Patient Gowns'
  ],
  Medications: [
    'Paracetamol', 'Ibuprofen', 'Aspirin', 'Amoxicillin', 'Ciprofloxacin',
    'Metformin', 'Insulin', 'Omeprazole', 'Simvastatin', 'Losartan',
    'Amlodipine', 'Furosemide', 'Warfarin', 'Heparin', 'Prednisone',
    'Dexamethasone', 'Morphine', 'Codeine', 'Tramadol', 'Antibiotics',
    'Antivirals', 'Antifungals', 'Antihistamines', 'Corticosteroids', 'Vaccines'
  ]
}

const products = categories.flatMap((cat, catIndex) =>
  productNames[cat].map((name, idx) => {
    const id = catIndex * 25 + idx + 1
    return {
      id,
      name,
      price: randPrice(id),
      category: cat,
      sku: `DL-${1000 + id}`,
      image: `https://picsum.photos/seed/dental${id}/600/400`,
      description: `High-quality ${name.toLowerCase()} for professional medical use. Essential in healthcare settings for accurate diagnostics and treatment. Item #${id}.`,
    }
  })
)

export default products
